import React from "react";
import "./style.css";

const NavbarRight = () => {
  return (
    <div className='navbar-right-container'>
      <input type='text' placeholder='Search' />
      <button>Cart</button>
      <button>Login</button>
      <button>Guide</button>
    </div>
  );
};

export default NavbarRight;
