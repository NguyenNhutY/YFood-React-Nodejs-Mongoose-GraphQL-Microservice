import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./adSlider.scss";

import { createImageList, ImageItem } from "./imageFactory";

interface AdSliderProps {}

const AdSlider: React.FC<AdSliderProps> = () => {
  const imageList = createImageList(); // Use factory function

  // Define Swiper configuration strategy
  const swiperConfig = {
    modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    slidesPerView: 4,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    navigation: true,
    autoplay: {
      delay: 4000, // Time between slides (4000ms = 4 seconds)
      disableOnInteraction: false, // Do not stop autoplay on user interaction
    },
    onSwiper: (swiper: any) => console.log("Swiper initialized:", swiper),
    onSlideChange: () => console.log("Slide changed"),
  };

  return (    <div className='ad-slider-swagger' >

    <div className='ad-slider' id='ad-slider'>
      <Swiper {...swiperConfig} className='ad-slider-list'>
        {imageList.map((item: any) => (
          <SwiperSlide key={item.get("id")} className='ad-slider-list-item'>
            <img
              src={item.get("src")}
              alt={item.get("alt")}
              loading='lazy'
              className='ad-slider-img'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />
    </div>    </div>

  );
};

export default AdSlider;
