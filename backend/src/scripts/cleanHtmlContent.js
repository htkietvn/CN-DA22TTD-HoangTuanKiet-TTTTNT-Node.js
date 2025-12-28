const mongoose = require('mongoose');
require('dotenv').config();

const News = require('../models/News');

// Hàm chuyển HTML thành text thuần
const htmlToPlainText = (html) => {
  if (!html) return '';
  
  return html
    // Chuyển <br> và </p> thành xuống dòng
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    // Thêm bullet cho list items
    .replace(/<li>/gi, '• ')
    // Xóa tất cả HTML tags còn lại
    .replace(/<[^>]+>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const cleanNewsContent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const allNews = await News.find({});
    console.log(`Found ${allNews.length} news articles`);

    let updated = 0;
    for (const news of allNews) {
      const originalContent = news.detailedContent || '';
      
      // Chỉ clean nếu có HTML tags
      if (/<[a-z][\s\S]*>/i.test(originalContent)) {
        const cleanContent = htmlToPlainText(originalContent);
        news.detailedContent = cleanContent;
        await news.save();
        updated++;
        console.log(`✓ Cleaned: ${news.title.substring(0, 50)}...`);
      }
    }

    console.log(`\n✅ Done! Updated ${updated} articles`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

cleanNewsContent();
