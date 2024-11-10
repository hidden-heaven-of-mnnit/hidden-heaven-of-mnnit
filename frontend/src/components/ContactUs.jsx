import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './ContactUs.css';
import NavBar from './NavBar';

const ContactUs = () => {
  const teamMembers = [
    {
      name: 'Anubhav Krishna',
      img: '/frontend/src/assets/anubhav.jpg',
      email: 'anubhav.2023ca20@mmnit.ac.in',
      linkedin: 'https://www.linkedin.com/in/anubhavkrishna20/',
    },
    {
      name: 'Prem Roshan Kumar',
      img: '/frontend/src/assets/prem.JPG',
      email: 'prem.2023ca74@mmnit.ac.in',
      linkedin: 'https://www.linkedin.com/in/prem-ca74/',
    },
    {
      name: 'Trishita Kesarwani',
      img: '/frontend/src/assets/trishita.jpg',
      email: 'trishita.2023ca106@mmnit.ac.in',
      linkedin: 'https://www.linkedin.com/in/trishita-kesarwani/',
    },
  ];

  return (
    <>
    <NavBar></NavBar>
    <div className="contact-page">
      <div className="contact-content">
        <h1 className="contact-title">Contact Our Team</h1>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.img} alt={member.name} className="team-image" />
              <h2 className="member-name">{member.name}</h2>
              <div className="icon-links">
                <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope className="contact-icon" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="contact-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
