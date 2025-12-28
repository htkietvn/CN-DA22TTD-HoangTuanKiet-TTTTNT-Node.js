const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.query.type || 'general';
    const uploadPath = path.join(__dirname, '../../uploads', type);
    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

// Upload single image
router.post('/image', protect, admin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const type = req.query.type || 'general';
    const imageUrl = `/uploads/${type}/${req.file.filename}`;
    
    res.json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload multiple images
router.post('/images', protect, admin, upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const type = req.query.type || 'general';
    const imageUrls = req.files.map(file => `/uploads/${type}/${file.filename}`);
    
    res.json({
      message: 'Images uploaded successfully',
      imageUrls: imageUrls
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List images in a folder
router.get('/list/:type', protect, admin, (req, res) => {
  try {
    const { type } = req.params;
    const uploadPath = path.join(__dirname, '../../uploads', type);
    
    if (!fs.existsSync(uploadPath)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(uploadPath);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file))
      .map(file => {
        const filePath = path.join(uploadPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          url: `/uploads/${type}/${file}`,
          size: stats.size,
          createdAt: stats.birthtime
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete image
router.delete('/image/:type/:filename', protect, admin, (req, res) => {
  try {
    const { type, filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads', type, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }

    fs.unlinkSync(filePath);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
