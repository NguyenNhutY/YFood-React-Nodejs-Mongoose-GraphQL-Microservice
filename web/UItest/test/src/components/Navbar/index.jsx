import React from "react";
import NavbarRight from "./NavbarRight";

import NavbarToggle from "./NavbarToggle";
import "./style.css";

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <img src='' alt='Logo' />
      <NavbarToggle />
      <NavbarRight />
    </div>
  );
};

export default Navbar;
