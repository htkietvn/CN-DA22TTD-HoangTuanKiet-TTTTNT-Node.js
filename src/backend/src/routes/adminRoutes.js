const express = require('express');
const { getDashboardStats, getUsers, updateUserRole, resetUserPassword, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

router.use(protect, admin);

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.patch('/users/:id/role', updateUserRole);
router.patch('/users/:id/reset-password', resetUserPassword);
router.delete('/users/:id', deleteUser);

module.exports = router;
