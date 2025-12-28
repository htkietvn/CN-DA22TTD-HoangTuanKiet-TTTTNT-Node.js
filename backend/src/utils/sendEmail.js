const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Tạo transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Cấu hình email
  const mailOptions = {
    from: `"AI Center" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // Gửi email
  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
