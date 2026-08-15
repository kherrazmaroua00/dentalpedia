const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');
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
    select: { id: true, email: true, name: true, bio: true, avatarUrl: true },
  });
  res.json(admin);
});

module.exports = router;