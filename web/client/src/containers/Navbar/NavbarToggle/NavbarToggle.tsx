import React, { useEffect } from "react";
import { assets } from "../../../assets/frontend_assets/assets";
import "./navbarToggle.scss";
import { Link } from "react-router-dom";

interface NavbarToggleProps {
  menu: string;
  setMenu: (menu: string) => void;
  isMenuOpen: boolean;
}

const NavbarToggle: React.FC<NavbarToggleProps> = ({
  menu,
  setMenu,
  isMenuOpen,
}) => {
  useEffect(() => {
    console.log("Menu Toggle File", menu);
  }, [menu]);

  return (
    <ul className={`menu navbar-menu ${isMenuOpen ? "open" : ""}`}>
      <Link
        to='/#explore-menu'
        onClick={() => setMenu("menu")}
        className={`menu-item ${menu === "menu" ? "active" : ""}`}
      >
        <img src={assets.menu} alt='img menu' />
      </Link>
      <Link
        to='/#food-display'
        onClick={() => setMenu("display")}
        className={`menu-item ${menu === "display" ? "active" : ""}`}
      >
        <img src={assets.display} alt='img display' />
      </Link>
      <Link
        to='/#app-download'
        onClick={() => setMenu("app")}
        className={`menu-item ${menu === "app" ? "active" : ""}`}
      >
        <img src={assets.mobile} alt='img mobile' />
      </Link>
      <Link
        to='/#footer'
        onClick={() => setMenu("contact")}
        className={`menu-item ${menu === "contact" ? "active" : ""}`}
      >
        <img src={assets.contact} alt='img contact' />
      </Link>
      <Link
        to='/career'
        onClick={() => setMenu("career")}
        className={`menu-item ${menu === "career" ? "active" : ""}`}
      >
        <img src={assets.career} alt='img career' />
      </Link>
      <Link
        to='/blogs'
        onClick={() => setMenu("blog")}
        className={`menu-item ${menu === "blog" ? "active" : ""}`}
      >
        <img src={assets.blog} alt='img blog' />
      </Link>
      <Link
        to='/quiz'
        onClick={() => setMenu("quiz")}
        className={`menu-item ${menu === "quiz" ? "active" : ""}`}
      >
        <img src={assets.quiz} alt='img quiz' />
      </Link>
    </ul>
  );
};

export default NavbarToggle;
