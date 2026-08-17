const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const yearsRoutes = require('./routes/years.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const modulesRoutes = require('./routes/modules.routes');
const videosRoutes = require('./routes/videos.routes');
const pageviewsRoutes = require('./routes/pageviews.routes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/years', yearsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/pageviews', pageviewsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Dentalpedia API is running' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));