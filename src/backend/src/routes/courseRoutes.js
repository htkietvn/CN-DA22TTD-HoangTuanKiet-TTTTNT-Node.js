const express = require('express');
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', protect, admin, createCourse);
router.put('/:id', protect, admin, updateCourse);
router.delete('/:id', protect, admin, deleteCourse);

module.exports = router;
