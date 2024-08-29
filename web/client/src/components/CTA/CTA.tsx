import React from "react";
import "./cta.scss";
import { Link } from "react-router-dom"; // Import Link from React Router

const CTA = () => (
  <div className='cta'>
    <div className='cta-content'>
      <h3>Test for Real Rewards</h3>
    </div>
    <div className='cta-btn'>
      <Link to='/quiz'>
        <button type='button'>Start</button>
      </Link>
    </div>
  </div>
);

export default CTA;
