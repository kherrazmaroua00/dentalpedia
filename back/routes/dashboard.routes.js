const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const requireAuth = require('../middleware/auth.middleware');

router.get('/stats', requireAuth, async (req, res) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    totalVisitors, visitorsToday, visitorsYesterday,
    visitorsThisMonth, visitorsLastMonth,
    totalModules, totalVideos, lastModule, lastVideo, recentModules,
  ] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.pageView.count({ where: { createdAt: { gte: startOfYesterday, lt: startOfToday } } }),
    prisma.pageView.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.pageView.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } } }),
    prisma.module.count(),
    prisma.video.count(),
    prisma.module.findFirst({ orderBy: { updatedAt: 'desc' } }),
    prisma.video.findFirst({ orderBy: { updatedAt: 'desc' } }),
    prisma.module.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { year: { select: { academicYear: true } } },
    }),
  ]);

  const monthChange = visitorsLastMonth > 0
    ? Math.round(((visitorsThisMonth - visitorsLastMonth) / visitorsLastMonth) * 100) : null;
  const dayChange = visitorsYesterday > 0
    ? Math.round(((visitorsToday - visitorsYesterday) / visitorsYesterday) * 100) : null;

  res.json({
    totalVisitors, visitorsToday, monthChange, dayChange, totalModules, totalVideos,
    lastModuleUpdate: lastModule?.updatedAt || null,
    lastVideoUpdate: lastVideo?.updatedAt || null,
    recentModules: recentModules.map((m) => ({
      id: m.id, name: m.name, yearName: m.year.academicYear, createdAt: m.createdAt,
    })),
  });
});

module.exports = router;