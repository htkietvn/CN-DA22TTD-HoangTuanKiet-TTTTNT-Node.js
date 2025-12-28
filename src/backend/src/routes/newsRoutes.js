const express = require('express');
const { getNews, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', protect, admin, createNews);
router.put('/:id', protect, admin, updateNews);
router.delete('/:id', protect, admin, deleteNews);

module.exports = router;
