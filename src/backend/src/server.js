const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { PORT } = require('./config/env');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/batches', require('./routes/courseBatchRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'AI Center API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
