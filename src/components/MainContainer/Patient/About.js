import React from 'react';
import { NavLink } from 'react-router-dom';

import './About.css';

import card1 from '../../../images/about-dr-card.jpg';
import card2 from '../../../images/about-house-card.jpg';
import card3 from '../../../images/about-phone-card.jpg';

function About() {
  return (
    <div className="div-container">
        <h1>About Health Club</h1>
        <div className="about">        
              <div className="about-card">
                <img className="about-img" src={card2} alt="home"></img>
                <p>Get quality medical care from the comfort of your own home. No more long wait times in the waiting room.</p>
              </div>
              <div className="about-card">
                <img className="about-img" src={card3} alt="phone"></img>
                <p>Get on the phone instantly with a General Practitioner or a Specialist, or make an appointment according to your schedule.</p>
              </div>
              <div className="about-card">
                  <img className="about-img" src={card1} alt="doctor"></img>
                  <p>Seamless transition of care with unified access of HIPAA protected medical records for treating physicians.</p>
              </div>
        </div>
        <NavLink to="/register">
          <span className="about-btn">
            <button className="learn-more-btn">Get Started</button>
          </span>
        </NavLink>
    </div>
  )
}

export default About