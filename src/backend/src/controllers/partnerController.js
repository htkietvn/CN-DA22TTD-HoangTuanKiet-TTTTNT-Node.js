const Partner = require('../models/Partner');

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find({ isActive: true }).sort({ order: 1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Partner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
