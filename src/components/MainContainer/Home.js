import React from 'react';
import { NavLink } from 'react-router-dom';

import banner from '../../images/hc-banner.jpg';
import './Home.css';

function Home() {
  return (
    <div className="main-container">
        <img className="home-img" src={banner} alt="Health Club"></img>
        <div className="home" id="home">        
              <div className="intro">
                  <div className="welcome"> 
                    <h1 className="alt-h1">Welcome to Health Club</h1>
                    <p>Bring your medical care home with in-demand or scheduled chat services to a vast network of specialists.  
                    </p>
                    <NavLink to="/about">
                      <button className="learn-more-btn">Learn more</button>
                    </NavLink>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default Home;