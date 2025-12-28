import { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Admin.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    api.get('/admin/users').then(res => setUsers(res.data));
  };

  const handleRoleChange = async (userId, newRole) => {
    if (window.confirm(`Bạn có chắc muốn đổi role thành ${newRole}?`)) {
      try {
        await api.patch(`/admin/users/${userId}/role`, { role: newRole });
        loadUsers();
        alert('Cập nhật role thành công!');
      } catch (error) {
        alert('Có lỗi xảy ra');
      }
    }
  };

  const handleResetPassword = async (userId, userName) => {
    if (window.confirm(`Bạn có chắc muốn reset mật khẩu của ${userName} thành "123456"?`)) {
      try {
        await api.patch(`/admin/users/${userId}/reset-password`);
        alert('Đã reset mật khẩu thành 123456');
      } catch (error) {
        alert('Có lỗi xảy ra');
      }
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Bạn có chắc muốn xóa user ${userName}? Hành động này không thể hoàn tác!`)) {
      try {
        await api.delete(`/admin/users/${userId}`);
        loadUsers();
        alert('Đã xóa user');
      } catch (error) {
        alert('Có lỗi xảy ra');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Quản lý người dùng</h1>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Role</th>
              <th>Ngày đăng ký</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || 'Chưa có'}</td>
                <td>
                  <span className={`status ${user.role === 'admin' ? 'active' : 'pending'}`}>
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  {user.role === 'user' ? (
                    <button 
                      className="btn-edit" 
                      onClick={() => handleRoleChange(user._id, 'admin')}
                    >
                      Đặt làm Admin
                    </button>
                  ) : (
                    <button 
                      className="btn-delete" 
                      onClick={() => handleRoleChange(user._id, 'user')}
                    >
                      Hủy Admin
                    </button>
                  )}
                  <button 
                    className="btn-warning" 
                    onClick={() => handleResetPassword(user._id, user.name)}
                    style={{ marginLeft: '5px', background: '#f39c12', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Reset MK
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    style={{ marginLeft: '5px' }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
