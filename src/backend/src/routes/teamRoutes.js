const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/', teamController.getAllMembers);
router.get('/:id', teamController.getMemberById);

module.exports = router;
