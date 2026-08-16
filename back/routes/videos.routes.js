const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const requireAuth = require('../middleware/auth.middleware');

router.post('/', requireAuth, async (req, res) => {
  const { moduleId, title, youtubeUrl, description, order } = req.body;
  if (!moduleId || !title || !youtubeUrl) return res.status(400).json({ error: 'Module, titre et URL requis' });
  const video = await prisma.video.create({
    data: { moduleId, title, youtubeUrl, description, order: order ?? 0 },
  });
  res.status(201).json(video);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { title, youtubeUrl, description, order } = req.body;
  try {
    const video = await prisma.video.update({ where: { id: req.params.id }, data: { title, youtubeUrl, description, order } });
    res.json(video);
  } catch {
    res.status(404).json({ error: 'Vidéo introuvable' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.video.delete({ where: { id: req.params.id } });
    res.json({ message: 'Vidéo supprimée' });
  } catch {
    res.status(404).json({ error: 'Vidéo introuvable' });
  }
});

module.exports = router;