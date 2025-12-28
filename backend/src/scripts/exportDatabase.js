const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import models
const News = require('../models/News');
const Course = require('../models/Course');
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const Partner = require('../models/Partner');
const Registration = require('../models/Registration');

const MONGODB_URI = 'mongodb://localhost:27017/ai-center';

async function exportDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Đã kết nối MongoDB');

    // Tạo thư mục backup
    const backupDir = path.join(__dirname, '../../backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Export từng collection
    const collections = [
      { name: 'news', model: News },
      { name: 'courses', model: Course },
      { name: 'users', model: User },
      { name: 'feedbacks', model: Feedback },
      { name: 'partners', model: Partner },
      { name: 'registrations', model: Registration }
    ];

    for (const col of collections) {
      try {
        const data = await col.model.find({}).lean();
        const filePath = path.join(backupDir, `${col.name}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`✓ Đã export ${col.name}: ${data.length} documents → ${filePath}`);
      } catch (err) {
        console.log(`✗ Lỗi export ${col.name}: ${err.message}`);
      }
    }

    console.log('\n✅ Hoàn tất! File backup ở thư mục: backend/backup/');
    
  } catch (error) {
    console.error('Lỗi:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

exportDatabase();
