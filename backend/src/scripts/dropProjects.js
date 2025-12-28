const mongoose = require('mongoose');
require('dotenv').config();

const dropProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await mongoose.connection.db.collection('projects').drop();
    console.log('✓ Dropped projects collection');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

dropProjects();
