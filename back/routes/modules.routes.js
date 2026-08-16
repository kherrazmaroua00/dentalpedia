const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const requireAuth = require('../middleware/auth.middleware');

router.get('/:id', async (req, res) => {
  const module = await prisma.module.findUnique({
    where: { id: req.params.id },
    include: { videos: { orderBy: { order: 'asc' } }, year: { select: { id: true, academicYear: true } } },
  });
  if (!module) return res.status(404).json({ error: 'Module introuvable' });
  res.json(module);
});

router.post('/', requireAuth, async (req, res) => {
  const { yearId, name, coefficient, description, semester, driveUrl } = req.body;
  if (!yearId || !name) return res.status(400).json({ error: 'Année et nom du module requis' });
  const module = await prisma.module.create({
    data: { yearId, name, coefficient: coefficient ? Number(coefficient) : null, description, semester: semester ? Number(semester) : null, driveUrl },
  });
  res.status(201).json(module);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { name, coefficient, description, semester, driveUrl } = req.body;
  try {
    const module = await prisma.module.update({
      where: { id: req.params.id },
      data: { name, coefficient: coefficient ? Number(coefficient) : null, description, semester: semester ? Number(semester) : null, driveUrl },
    });
    res.json(module);
  } catch {
    res.status(404).json({ error: 'Module introuvable' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.module.delete({ where: { id: req.params.id } });
    res.json({ message: 'Module supprimé' });
  } catch {
    res.status(404).json({ error: 'Module introuvable' });
  }
});

module.exports = router;