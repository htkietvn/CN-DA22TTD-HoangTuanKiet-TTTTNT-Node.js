const Feedback = require('../models/Feedback');
const { sendEmail } = require('../utils/sendEmail');
const { EMAIL_USER } = require('../config/env');

exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    
    // Gửi email thông báo cho admin
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">💬 Tin nhắn mới từ khách hàng</h1>
        </div>
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #667eea; margin-top: 0;">Thông tin người gửi</h2>
            <p><strong>Họ tên:</strong> ${feedback.name}</p>
            <p><strong>Email:</strong> ${feedback.email}</p>
            <p><strong>Số điện thoại:</strong> ${feedback.phone}</p>
            ${feedback.subject ? `<p><strong>Tiêu đề:</strong> ${feedback.subject}</p>` : ''}
          </div>
          <div style="background: white; padding: 20px; border-radius: 5px;">
            <h2 style="color: #667eea; margin-top: 0;">Nội dung tin nhắn</h2>
            <p style="white-space: pre-wrap;">${feedback.message}</p>
          </div>
          <div style="text-align: center; margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px;">
            <p style="margin: 0; color: #1976d2;">
              📧 Vui lòng trả lời khách hàng qua email: <strong>${feedback.email}</strong>
            </p>
          </div>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        email: EMAIL_USER, // Gửi đến email admin
        subject: `💬 Tin nhắn mới từ ${feedback.name}`,
        message: `Tin nhắn từ: ${feedback.name}\nEmail: ${feedback.email}\nSố điện thoại: ${feedback.phone}\n\nNội dung:\n${feedback.message}`,
        html: emailContent
      });
    } catch (emailError) {
      console.error('Lỗi khi gửi email thông báo:', emailError);
      // Vẫn trả về success vì feedback đã được lưu
    }

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFeedbackStatus = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
