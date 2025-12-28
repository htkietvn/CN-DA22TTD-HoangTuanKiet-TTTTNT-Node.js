import '../styles/Policy.css';

const TermsOfService = () => {
  return (
    <div className="policy-page">
      <div className="page-header">
        <h1>Điều khoản sử dụng</h1>
      </div>

      <div className="container">
        <div className="policy-content">
          <section>
            <h2>1. Chấp nhận điều khoản</h2>
            <p>
              Bằng việc sử dụng website và dịch vụ của AI Center, bạn đồng ý tuân thủ 
              các điều khoản và điều kiện được nêu dưới đây.
            </p>
          </section>

          <section>
            <h2>2. Đăng ký và tài khoản</h2>
            <ul>
              <li>Bạn phải cung cấp thông tin chính xác khi đăng ký</li>
              <li>Bạn chịu trách nhiệm bảo mật thông tin tài khoản</li>
              <li>Không được chia sẻ tài khoản cho người khác</li>
            </ul>
          </section>

          <section>
            <h2>3. Sử dụng dịch vụ</h2>
            <p>
              Bạn cam kết sử dụng dịch vụ của chúng tôi một cách hợp pháp và không:
            </p>
            <ul>
              <li>Vi phạm quyền sở hữu trí tuệ</li>
              <li>Phát tán nội dung vi phạm pháp luật</li>
              <li>Gây ảnh hưởng đến hệ thống</li>
            </ul>
          </section>

          <section>
            <h2>4. Thanh toán và hoàn tiền</h2>
            <p>
              Học phí được thanh toán theo quy định của từng khóa học. 
              Chính sách hoàn tiền áp dụng trong vòng 7 ngày đầu tiên nếu bạn chưa 
              tham gia quá 20% nội dung khóa học.
            </p>
          </section>

          <section>
            <h2>5. Quyền sở hữu trí tuệ</h2>
            <p>
              Tất cả nội dung khóa học, tài liệu học tập thuộc quyền sở hữu của AI Center. 
              Bạn không được sao chép, phân phối hoặc sử dụng cho mục đích thương mại.
            </p>
          </section>

          <section>
            <h2>6. Thay đổi điều khoản</h2>
            <p>
              Chúng tôi có quyền thay đổi điều khoản sử dụng bất cứ lúc nào. 
              Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
