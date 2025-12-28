const express = require('express');
const { getPartners, getPartner, createPartner, updatePartner, deletePartner } = require('../controllers/partnerController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

router.get('/', getPartners);
router.get('/:id', getPartner);
router.post('/', protect, admin, createPartner);
router.put('/:id', protect, admin, updatePartner);
router.delete('/:id', protect, admin, deletePartner);

module.exports = router;
