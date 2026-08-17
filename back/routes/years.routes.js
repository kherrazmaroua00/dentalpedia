const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const requireAuth = require('../middleware/auth.middleware');

router.get('/', async (req, res) => {
  const years = await prisma.year.findMany({
    orderBy: { order: 'asc' },
    include: {
      modules: { select: { id: true, name: true, semester: true }, orderBy: { createdAt: 'asc' } },
      _count: { select: { modules: true } },
    },
  });
  res.json(years.map((y) => ({
    id: y.id,
    academicYear: y.academicYear,
    description: y.description,
    theoryPercentage: y.theoryPercentage,
    order: y.order,
    modulesCount: y._count.modules,
    modules: y.modules,
  })));
});

router.get('/:id', async (req, res) => {
  const year = await prisma.year.findUnique({
    where: { id: req.params.id },
    include: { modules: { include: { _count: { select: { videos: true } } } } },
  });
  if (!year) return res.status(404).json({ error: 'Année introuvable' });
  res.json(year);
});

router.post('/', requireAuth, async (req, res) => {
  const { academicYear, description, theoryPercentage, order } = req.body;
  if (!academicYear) return res.status(400).json({ error: "Le nom de l'année est requis" });
  const year = await prisma.year.create({
    data: { academicYear, description, theoryPercentage, order: order ?? 0 },
  });
  res.status(201).json(year);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { academicYear, description, theoryPercentage, order } = req.body;
  try {
    const year = await prisma.year.update({
      where: { id: req.params.id },
      data: { academicYear, description, theoryPercentage, order },
    });
    res.json(year);
  } catch {
    res.status(404).json({ error: 'Année introuvable' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.year.delete({ where: { id: req.params.id } });
    res.json({ message: 'Année supprimée' });
  } catch {
    res.status(404).json({ error: 'Année introuvable' });
  }
});

router.patch('/reorder', requireAuth, async (req, res) => {
  const { years } = req.body; // [{id, order}, ...]
  if (!Array.isArray(years)) return res.status(400).json({ error: 'Format invalide' });
  await Promise.all(years.map((y) => prisma.year.update({ where: { id: y.id }, data: { order: y.order } })));
  res.json({ message: 'Ordre mis à jour' });
});

module.exports = router;