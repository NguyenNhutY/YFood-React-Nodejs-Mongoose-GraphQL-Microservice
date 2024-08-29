import React from "react";
import "./footer.scss";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
// import AnimationFooter from "../AnimationFooter/AnimatioFooter";
import Map from "../Map/Map";

const Footer: React.FC = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <Link to='#nav'>
            <img src={assets.logo} alt='Logo' />
          </Link>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem
          </p>
          <div className='footer-social-icons'>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.facebook_icon} alt='Facebook' />
            </a>
            <a
              href='https://www.twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.twitter_icon} alt='Twitter' />
            </a>
            <a
              href='https://www.linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={assets.linkedin_icon} alt='LinkedIn' />
            </a>
            {/* <AnimationFooter /> */}
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/info'>About us</Link>
            </li>
            <li>
              <Link to='/order'>Delivery</Link>
            </li>
            <li>
              <Link to='/policy'>Privacy Policy</Link>
            </li>
            <li>
              <Link to='/thanks'>Thanks</Link>
            </li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <a href='tel:+12124567890'>Phone</a>
            </li>
            <li>
              <a href='mailto:contact@tomaato.com'>Email</a>
            </li>
            <li>
              <Link to='/feedback'>Feedback</Link>
            </li>
            <li className=''>
              <a href='https://www.google.com/maps/@10.7366632,106.6645009,15z?entry=ttu'>
                <Map className='img-map' />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Footer;
