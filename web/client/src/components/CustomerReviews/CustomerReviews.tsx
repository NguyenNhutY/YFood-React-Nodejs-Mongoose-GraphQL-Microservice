import React from "react";
import "./customerReviews.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";

// Define types for the review and props
interface Review {
  id: number;
  rating: number; // Rating from 1 to 5
  comment: string;
  media?: string; // URL to image or video
  username: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStarSolid} className='star' />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className='star' />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className='star' />
        ))}
      </>
    );
  };

  return (
    <div className='customer-reviews'>
      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className='review'>
            <div className='review-rating'>{renderStars(review.rating)}</div>
            <p className='review-username'>{review.username}</p>{" "}
            {/* Hiển thị tên người dùng */}
            <p className='review-comment'>{review.comment}</p>
            {review.media && (
              <div className='review-media'>
                {review.media.endsWith(".mp4") ? (
                  <video controls src={review.media} className='review-video' />
                ) : (
                  <img
                    src={review.media}
                    alt='Review Media'
                    className='review-image'
                  />
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
};

export default CustomerReviews;
