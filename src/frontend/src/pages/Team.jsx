import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Team.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${API_URL}/team`);
        setTeamMembers(res.data);
      } catch (error) {
        console.error('Lỗi tải đội ngũ:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="team-page">
        <div className="team-hero">
          <h1>Đội Ngũ Giảng Viên</h1>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="team-page">
      <div className="team-hero">
        <h1>Đội Ngũ Giảng Viên</h1>
        <p>Đội ngũ chuyên gia hàng đầu trong lĩnh vực AI và Machine Learning</p>
      </div>

      <div className="team-container">
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member._id} className="team-card">
              <div className="team-card-image">
                <img 
                  src={member.image || '/images/default-avatar.png'} 
                  alt={member.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
              </div>
              <div className="team-card-content">
                <h3>{member.name}</h3>
                <p className="team-title">{member.position}</p>
                <p className="team-description">{member.bio}</p>
                
                <div className="team-contact">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="contact-link">
                      📧 {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="contact-link">
                      📞 {member.phone}
                    </a>
                  )}
                </div>

                <div className="team-social">
                  {member.facebook && (
                    <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
