import React, { ReactNode, useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import "./layout.scss"; // Import CSS file for Layout
import Navbar from "../../containers/Navbar/Navbar";
import PromotionBarClock from "../../components/PromotionBarClock/PromotionBarClock";
import LoginPopup from "../../pages/LoginPopup/LoginPopup";
import ChatBotBtn from "../../components/ChatBotBtn/ChatBotBtn";
import BackToTopButton from "../../components/BackToTopButton/BackToTopButton";
import MusicBar from "../../components/MusicBar/MusicBarContainer";

interface LayoutProps {
  children: ReactNode; // Định nghĩa kiểu cho props.children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchName, setSearchName] = useState<string>("");
  const [showLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Tạo và thêm script để tải Google Translate
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);

    // Định nghĩa hàm toàn cục sẽ được gọi bởi Google Translate
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Làm sạch bằng cách gỡ bỏ script khi component unmount
    return () => {
      document.body.removeChild(addScript);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <>
      {showLogin ? (
        <LoginPopup setShowLogin={setShowLogin} showLogin={showLogin} />
      ) : (
        <div className='wrapper'>
          <div className='btn-translate' id='google_translate_element'></div>
          <PromotionBarClock />
          <Navbar
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            setSearchName={setSearchName}
          />

          {/* Phần tử để Google Translate nhúng vào */}

          <main className='content'>{children}</main>
          <ChatBotBtn />
          <BackToTopButton />
          <MusicBar />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
