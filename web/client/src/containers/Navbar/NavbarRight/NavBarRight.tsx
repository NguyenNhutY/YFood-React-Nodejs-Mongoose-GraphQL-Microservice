import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../../components/Search/Search";
import IntroTourButton from "../../../components/IntroBtn/IntroBtn";
import { navbarIntroSteps } from "../../../types";
import { assets } from "../../../assets/frontend_assets/assets";
import { StoreContext } from "../../../context/StoreContext";

const NavbarRight: React.FC<{
  setSearchName: (name: string) => void;
  setShowLogin: (show: boolean) => void;
  showLogin: boolean;
  userName: string | null;
  handleLogout: () => void;
}> = ({ setSearchName, setShowLogin, userName, handleLogout, showLogin }) => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    // Handle case where context is not available
    return <div>Error: StoreContext not available</div>;
  }

  const { getTotalCartAmount, getCartItemCount } = storeContext;
  const handleLoginClick = () => {
    setShowLogin(true);
    console.log("Login button clicked", showLogin); // Debug line
  };
  console.log("NavbarRight file ", showLogin);

  const totalAmount = getTotalCartAmount();

  return (
    <div className='navbar-right'>
      <Search className='search-nav-input' setSearchName={setSearchName} />
      <div className='navbar-search-icon'>
        <Link to='/cart'>
          <div className='basket-icon-container'>
            <img src={assets.basket_icon} alt='basket_icon' />
            {totalAmount > 0 && (
              <div className={getCartItemCount() === 0 ? "" : "dot"}>
                <span>{getCartItemCount ? getCartItemCount() : ""}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
      {userName ? (
        <div className='user-info'>
          <span className='user-name'>{userName}</span>
          <button className='logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className='login-btn' onClick={() => handleLoginClick()}>
          Login
        </button>
      )}
      <IntroTourButton className='btn-intro' steps={navbarIntroSteps} />
    </div>
  );
};

export default NavbarRight;
