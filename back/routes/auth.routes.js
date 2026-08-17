const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const prisma = require('../prisma/client');
const { comparePassword, hashPassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');
const { sendResetEmail } = require('../utils/mailer');
const requireAuth = require('../middleware/auth.middleware');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return res.status(401).json({ error: 'Identifiants invalides' });
  const valid = await comparePassword(password, admin.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Identifiants invalides' });

  const token = signToken({ id: admin.id });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ id: admin.id, email: admin.email, name: admin.name });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Déconnecté' });
});

router.get('/me', requireAuth, async (req, res) => {
  const admin = await prisma.admin.findUnique({
    where: { id: req.adminId },
    select: { id: true, email: true, recoveryEmail: true, name: true, bio: true, avatarUrl: true },
  });
  res.json(admin);
});

router.put('/me', requireAuth, async (req, res) => {
  const { name, bio, avatarUrl } = req.body;
  const admin = await prisma.admin.update({
    where: { id: req.adminId },
    data: { name, bio, avatarUrl },
    select: { id: true, email: true, recoveryEmail: true, name: true, bio: true, avatarUrl: true },
  });
  res.json(admin);
});

router.put('/email', requireAuth, async (req, res) => {
  const { newEmail, password } = req.body;
  if (!newEmail || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });

  const admin = await prisma.admin.findUnique({ where: { id: req.adminId } });
  const valid = await comparePassword(password, admin.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' });

  const existing = await prisma.admin.findUnique({ where: { email: newEmail } });
  if (existing && existing.id !== admin.id) {
    return res.status(400).json({ error: 'Cet email est déjà utilisé' });
  }

  const updated = await prisma.admin.update({
    where: { id: req.adminId },
    data: { email: newEmail },
    select: { id: true, email: true, recoveryEmail: true, name: true, bio: true, avatarUrl: true },
  });
  res.json(updated);
});

router.put('/recovery-email', requireAuth, async (req, res) => {
  const { recoveryEmail } = req.body;
  const admin = await prisma.admin.update({
    where: { id: req.adminId },
    data: { recoveryEmail: recoveryEmail || null },
    select: { id: true, email: true, recoveryEmail: true, name: true, bio: true, avatarUrl: true },
  });
  res.json(admin);
});

router.put('/password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Mot de passe actuel et nouveau requis' });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caractères' });
  }
  const admin = await prisma.admin.findUnique({ where: { id: req.adminId } });
  const valid = await comparePassword(currentPassword, admin.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Mot de passe actuel incorrect' });

  const passwordHash = await hashPassword(newPassword);
  await prisma.admin.update({ where: { id: req.adminId }, data: { passwordHash } });
  res.json({ message: 'Mot de passe mis à jour' });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requis' });

  const admin = await prisma.admin.findFirst({ where: { OR: [{ email }, { recoveryEmail: email }] } });

  if (admin) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.passwordReset.create({ data: { adminId: admin.id, token, expiresAt } });
    const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password?token=${token}`;
    await sendResetEmail(email, resetUrl);
  }

  res.json({ message: 'Si cet email existe, un lien de réinitialisation a été envoyé.' });
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Token et nouveau mot de passe requis' });
  if (newPassword.length < 8) return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères' });

  const record = await prisma.passwordReset.findUnique({ where: { token } });
  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ error: 'Lien invalide ou expiré' });
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.admin.update({ where: { id: record.adminId }, data: { passwordHash } });
  await prisma.passwordReset.delete({ where: { token } });

  res.json({ message: 'Mot de passe réinitialisé avec succès' });
});

module.exports = router;