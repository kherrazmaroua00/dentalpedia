const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.post('/', async (req, res) => {
  const { path } = req.body;
  if (!path) return res.status(400).json({ error: 'Chemin requis' });
  await prisma.pageView.create({ data: { path } });
  res.status(201).json({ message: 'ok' });
});

module.exports = router;