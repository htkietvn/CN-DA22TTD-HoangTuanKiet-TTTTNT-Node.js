const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Import models
const User = require('../models/User');
const Course = require('../models/Course');
const News = require('../models/News');
const Partner = require('../models/Partner');
const Feedback = require('../models/Feedback');
const Registration = require('../models/Registration');

const exportData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const exportDir = path.join(__dirname, '../../backup');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    // Export all collections
    const collections = [
      { name: 'users', model: User },
      { name: 'courses', model: Course },
      { name: 'news', model: News },
      { name: 'partners', model: Partner },
      { name: 'feedbacks', model: Feedback },
      { name: 'registrations', model: Registration }
    ];

    for (const col of collections) {
      const data = await col.model.find({}).lean();
      const filePath = path.join(exportDir, `${col.name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Exported ${data.length} ${col.name} to ${filePath}`);
    }

    console.log('\nExport completed! Files saved in backend/backup/');
    process.exit(0);
  } catch (error) {
    console.error('Export failed:', error);
    process.exit(1);
  }
};

exportData();
