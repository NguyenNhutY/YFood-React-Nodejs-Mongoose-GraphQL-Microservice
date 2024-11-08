import React, { useContext, useState } from "react";
import "./navbar.scss";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import NavbarToggle from "./NavbarToggle/NavbarToggle";
import NavBarRight from "./NavbarRight/NavBarRight";
import { gql,useMutaion } from "@apollo/client";

const LOGOUT_MUTATION = gql`
mutation logoutAccount
(
$token
){
  logout(token: $token) {
    isLoggedIn
  }}`

interface NavbarProps {
  setShowLogin: (show: boolean) => void;
  setSearchName: (name: string) => void;
  footerRef: React.RefObject<HTMLDivElement>;
  showLogin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  setShowLogin,
  setSearchName,
  footerRef,
  showLogin,
}) => {
  const [menu, setMenu] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Navbar must be used within an AuthProvider");
  }

  const { username, setUsername } = authContext;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setUsername(null); // Clear user context
  };

  return (
    <div className='navbar' id='nav'>
      <Link to='/'>
        <img className='logo' src={assets.logo} alt='logo' />
      </Link>
      <div
        className='menu-toggle'
        onClick={toggleMenu}
        aria-label='Toggle menu'
      >
        &#9776;
      </div>
      <NavbarToggle menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} />
      <NavBarRight
        setSearchName={setSearchName}
        setShowLogin={setShowLogin}
        userName={username}
        handleLogout={handleLogout}
        showLogin={showLogin}
      />
    </div>
  );
};

export default Navbar;
