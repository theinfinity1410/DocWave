const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const docRoutes = require('./routes/docRoutes');
const aiRoutes = require('./aiRoutes');
const socketRoutes = require('./socketRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
dotenv.config();

const app = express();
const server = http.createServer(app);

db();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/documents', authMiddleware, docRoutes);
app.use('/api/ai', authMiddleware, aiRoutes);

socketRoutes(server);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});