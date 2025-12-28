import './SloganMarquee.css';

const SloganMarquee = ({ slogans }) => {
  const defaultSlogans = [
    '🚀 Đào tạo AI chất lượng cao',
    '💡 Kiến thức thực tiễn - Ứng dụng ngay',
    '🎯 Đội ngũ chuyên gia hàng đầu',
    '🌟 Cùng bạn chinh phục AI'
  ];

  const displaySlogans = slogans || defaultSlogans;
  // Duplicate slogans for seamless loop
  const allSlogans = [...displaySlogans, ...displaySlogans];

  return (
    <div className="slogan-marquee">
      <div className="marquee-content">
        {allSlogans.map((slogan, index) => (
          <span key={index}>{slogan}</span>
        ))}
      </div>
    </div>
  );
};

export default SloganMarquee;
