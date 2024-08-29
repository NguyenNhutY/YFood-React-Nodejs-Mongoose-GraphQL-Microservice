import React from "react";
import "./style.css";

const Card = ({ card, className }) => {
  console.log("Card proped", card);
  return (
    <div className='card-container' {className}`>
      <div className='heart-img-swagger'>
        <img className='heart-img' src={card.img} alt='' />
      </div>

      <div className='card-header-container'>
        <div className='card-header-img'></div>
      </div>
      <div className='card-bottom-container'>
        <div className='card-bottom-title-rating-container'>
          <div className='title-swagger'>
            <heading className='title'>{card.title}</heading>
          </div>
          <div className='rating'> {card.rating}</div>
        </div>
        <div className='detail-swagger'>
          <p>{card.text}</p>
        </div>

        <div className='price-container'>
          <div className='origincal-price-swagger'>
            <strike className='origincal-price'>{card.originalPrice}</strike>
          </div>
          <div className='promo-price-swagger'>
            <div className='promo-price'>{card.promoPrice}</div>
          </div>
        </div>
        <div className='btn-detail-swagger'>
          <button className='btn-detail'>View Detail</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
