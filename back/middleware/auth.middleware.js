const { verifyToken } = require('../utils/jwt');

function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Non authentifié' });

  try {
    const decoded = verifyToken(token);
    req.adminId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Session invalide ou expirée' });
  }
}

module.exports = requireAuth;