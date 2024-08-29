import React from "react";
import "./thanks.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Thanks: React.FC = () => {
  const handleGoBack = () => {
    window.history.back(); // Quay lại trang trước
  };

  return (
    <>
      <button className='btn-back-history' onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowUp} className='fontawe' />
      </button>
      <div className='container  '>
        <h2>YFood - Cảm Ơn Quý Khách</h2>
        <p className=''>
          YFood xin gửi lời cảm ơn chân thành đến quý khách hàng đã lựa chọn và
          tin tưởng chúng tôi là đối tác trong hành trình khám phá ẩm thực của
          quý vị. Chúng tôi cam kết luôn nỗ lực để mang đến cho quý khách những
          trải nghiệm mua sắm tuyệt vời nhất, với sự đa dạng sản phẩm, chất
          lượng và dịch vụ chuyên nghiệp. Hãy tiếp tục đồng hành cùng YFood và
          khám phá thêm nhiều hương vị mới mỗi ngày!
        </p>
        {/* <video controls>
          <source src='D:\bt_html\Project_Part3\Food Delivery\frontend\src\assets\frontend_assets\LẶNG.mp4' />
        </video> */}

        <div id='qlogo'>
          <div className='poziomq'>
            <figure className='liscie'>
              <span className='lisc-lewy'>
                <span className='after'></span>
              </span>
              <span className='lisc-lewy drugi'>
                <span className='after'></span>
              </span>
              <span className='lisc-prawy'>
                <span className='after'></span>
              </span>
              <span className='lisc-prawy drugi'>
                <span className='after'></span>
              </span>
              <span className='lodyga'></span>
            </figure>
            <figure className='rece'>
              <span className='reka reka-lewa'></span>
              <span className='reka reka-prawa'></span>
            </figure>
            <figure className='cialo'>
              <span className='twarz'>
                <span className='oczy'>
                  <span className='oko oko-lewe'></span>
                  <span className='oko oko-prawe'></span>
                </span>
                <span className='piegi'>
                  <span className='pieg pieg-lewy'></span>
                  <span className='pieg pieg-prawy'></span>
                </span>
                <span className='buzia'>
                  <span className='gardlo'></span>
                  <span className='zuby'></span>
                </span>
              </span>
            </figure>
            <figure className='nogi'>
              <span className='noga-lewa'></span>
              <span className='noga-prawa'></span>
            </figure>
          </div>
          <figure className='cien'></figure>
          <figure className='tekst'>Hover Me!</figure>
        </div>
      </div>
    </>
  );
};

export default Thanks;
