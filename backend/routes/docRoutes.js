const express = require('express');
const { getDocument, createDocument, updateDocument } = require('./controllers/docController');
const authMiddleware = require('./middlewares/authMiddleware');

const router = express.Router();

router.post('/get',authMiddleware, getDocument);
router.post('/', authMiddleware, createDocument);
router.put('/:id', authMiddleware, updateDocument);

module.exports = router;