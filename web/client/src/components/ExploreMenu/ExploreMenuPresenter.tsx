import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "./exploreMenu.scss";
import "./swiper.scss";

// Define props interface
interface MenuItem {
  _id?: string;
  menu_name: string;
  menu_image: string;
}

interface ExploreMenuPresenterProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  menuItems: MenuItem[];
}

const ExploreMenuPresenter: React.FC<ExploreMenuPresenterProps> = ({
  category,
  setCategory,
  menuItems,
}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Discover our diverse menu featuring a delectable array of dishes crafted
        with the finest ingredients.
      </p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => console.log("Swiper initialized:", swiper)}
        onSlideChange={() => console.log("Slide changed")}
        className='explore-menu-list my-swiper'
      >
        {menuItems.map((item, index) => (
          <SwiperSlide
            key={item._id || index} // Use item._id if available, fallback to index
            className='explore-menu-list-item'
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            aria-label={`Category ${item.menu_name}`} // Accessibility improvement
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
              loading='lazy'
            />
            <p>{item.menu_name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />
    </div>
  );
};

export default ExploreMenuPresenter;
