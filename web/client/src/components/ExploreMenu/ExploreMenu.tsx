import React, { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./exploreMenu.scss";
import { gql, useQuery } from "@apollo/client";

// GraphQL query
const CATEGORY_QUERY = gql`
  query {
    listCategory {
      success
      message
      datas {
        _id
        name
        image
      }
    }
  }
`;

// Define props interface
interface ExploreMenuProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExploreMenu: React.FC<ExploreMenuProps> = ({ category, setCategory }) => {
  const swiperRef = useRef<any>(null);
  const { data, loading, error } = useQuery(CATEGORY_QUERY);

  const goNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const goPrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sử dụng mảng thông thường để lưu danh sách danh mục
  const categories = data.listCategory.datas;

  // Kiểm tra xem có danh mục nào không
  if (!categories || categories.length === 0) {
    return <p>No categories available.</p>;
  }

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Discover our diverse menu featuring a delectable array of dishes crafted
        with the finest ingredients.
      </p>
      <div className="swiper-container">
        <button onClick={goPrev} className="swiper-button-prev"> &#8612; </button>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={4}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          navigation
          className='explore-menu-list my-swiper'
        >
          {categories.map((item: any) => (
            <SwiperSlide
              key={item._id}
              className='explore-menu-list-item'
              onClick={() =>
                setCategory((prev) =>
                  prev === item._id ? "All" : item._id
                )
              }
              aria-label={`Category ${item._id}`}
            >
              <img
                className={category === item._id ? "active" : ""}
                src={item.image}
                alt={item.name}
                loading='lazy'
              />
              <p>{item.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={goNext} className="swiper-button-next"> &#8614;  </button>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
