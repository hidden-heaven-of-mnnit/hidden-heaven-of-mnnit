import React from 'react';
import './About.css';
import NavBar from './NavBar';
const About = () => {
  return (
    <>
    <NavBar></NavBar>
    <div className="about">
      <div className="content">
        <div className="about-title">About Hidden Heavens of MNNIT</div>
        <div className="about-description">
          <p>
            Welcome to <strong>Hidden Heavens of MNNIT</strong>, an interactive treasure hunt game designed to help you explore every hidden corner of MNNIT Allahabad's beautiful campus.
          </p>
          <p>
            With Hidden Heavens, you can take on thrilling quests, discover landmarks, and unlock hidden stories of the campus that you may never have known before. Whether you're a curious explorer, a social gamer, or someone looking to host memorable events, this game has something for everyone!
          </p>
        </div>

        <div className="features-section">
          <div className="feature-box">
            <h2 className="feature-title">Discover MNNIT</h2>
            <p>Embark on a journey across the campus and reveal its hidden gems. Every quest is crafted to take you through the well-known and lesser-known locations, blending fun with discovery.</p>
          </div>
          <div className="feature-box">
            <h2 className="feature-title">Play with Friends</h2>
            <p>Challenge your friends in real-time treasure hunts! Join public quests or create private games to host your very own campus exploration adventures.</p>
          </div>
          <div className="feature-box">
            <h2 className="feature-title">Host Your Own Quest</h2>
            <p>Become the master of the hunt by designing and hosting your own treasure hunts, complete with custom clues and objectives. Perfect for club events and fun gatherings!</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
