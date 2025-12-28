import '../styles/Policy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="page-header">
        <h1>Chính sách bảo mật</h1>
      </div>

      <div className="container">
        <div className="policy-content">
          <section>
            <h2>1. Thu thập thông tin</h2>
            <p>
              Chúng tôi thu thập thông tin cá nhân của bạn khi bạn đăng ký khóa học, 
              liên hệ với chúng tôi hoặc sử dụng các dịch vụ của chúng tôi.
            </p>
          </section>

          <section>
            <h2>2. Sử dụng thông tin</h2>
            <p>
              Thông tin của bạn được sử dụng để:
            </p>
            <ul>
              <li>Cung cấp dịch vụ đào tạo</li>
              <li>Liên lạc và hỗ trợ học viên</li>
              <li>Cải thiện chất lượng dịch vụ</li>
              <li>Gửi thông tin về khóa học mới</li>
            </ul>
          </section>

          <section>
            <h2>3. Bảo mật thông tin</h2>
            <p>
              Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và không chia sẻ 
              với bên thứ ba khi chưa có sự đồng ý của bạn.
            </p>
          </section>

          <section>
            <h2>4. Quyền của người dùng</h2>
            <p>
              Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình 
              bất cứ lúc nào.
            </p>
          </section>

          <section>
            <h2>5. Liên hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ với 
              chúng tôi qua email: privacy@aicenter.vn
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
