const mongoose = require('mongoose');

const courseBatchSchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  batchName: { 
    type: String, 
    required: true 
  }, // VD: "Đợt 1", "Khóa tháng 3/2025"
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  registrationDeadline: { 
    type: Date 
  }, // Hạn đăng ký
  schedule: { 
    type: String 
  }, // VD: "Thứ 2, 4, 6 - 19:00-21:00"
  location: { 
    type: String,
    default: 'Online'
  }, // Online hoặc địa điểm cụ thể
  maxStudents: { 
    type: Number, 
    default: 30 
  },
  currentStudents: { 
    type: Number, 
    default: 0 
  },
  price: { 
    type: Number 
  }, // Giá riêng cho đợt này (nếu khác giá gốc)
  status: { 
    type: String, 
    enum: ['upcoming', 'open', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  // upcoming: Sắp mở đăng ký
  // open: Đang mở đăng ký
  // ongoing: Đang diễn ra
  // completed: Đã kết thúc
  // cancelled: Đã hủy
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

// Virtual để kiểm tra còn chỗ không
courseBatchSchema.virtual('availableSlots').get(function() {
  return this.maxStudents - this.currentStudents;
});

// Virtual để kiểm tra có thể đăng ký không
courseBatchSchema.virtual('canRegister').get(function() {
  const now = new Date();
  const deadline = this.registrationDeadline || this.startDate;
  return this.status === 'open' && 
         this.currentStudents < this.maxStudents && 
         now <= deadline;
});

module.exports = mongoose.model('CourseBatch', courseBatchSchema);
