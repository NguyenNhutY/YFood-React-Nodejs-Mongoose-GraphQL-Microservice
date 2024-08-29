import React, { useEffect } from "react";
import "./notFound.scss";
import { Link, useNavigate } from "react-router-dom";

export function PageNotFound() {
  const history = useNavigate();

  useEffect(() => {
    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        // Nếu mất kết nối, chuyển hướng sang trang "Page Not Found"
        history.push("/404"); // Sử dụng đường dẫn tương ứng với trang lỗi của bạn
      }
    };

    // Kiểm tra kết nối mạng khi trang được tải
    window.addEventListener("load", handleNetworkChange);

    // Dọn dẹp event listener khi component bị unmount
    return () => {
      window.removeEventListener("load", handleNetworkChange);
    };
  }, [history]);

  return (
    <div className='cont-404'>
      <button className='button'>
        <Link to='/'>Please Try to F5</Link>
      </button>
    </div>
  );
}

export default PageNotFound;
