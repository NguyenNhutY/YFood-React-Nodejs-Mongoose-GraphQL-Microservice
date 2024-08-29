import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./product.scss";
import Modal from "../../components/Modal/Modal"; // Ensure path is correct
import { isDiscountTime, isWeekday } from "../../utils/timeUtils";
import Notification from "../../components/Notification/Notification";
import AdSlider from "../../components/AdSlider/AdSlider";
import FoodDisplay from "../../containers/FoodDisplay/FoodDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews"; // Ensure path is correct
import { customerReviewsData } from "../../types/customerReviews";

interface NotificationType {
  id: number;
  message: string;
  type: "success" | "error";
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { food_list, addToCart } = useContext(StoreContext) || {};
  const product = food_list?.find((item) => item._id === id);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const navigate = useNavigate();

  if (!product) {
    console.log("Product not found");
    return <div>Product not found</div>;
  }

  const currentTime = new Date(); // Get current time for discount calculation
  const discountedPrice =
    isWeekday(currentTime) && isDiscountTime(currentTime)
      ? product.price * 0.9
      : product.price;

  const handleAddToCart = (id: string) => {
    if (addToCart) {
      addToCart(id);
      addNotification("Item added to cart", "success");
    }
  };

  const addNotification = (message: string, type: "success" | "error") => {
    setNotifications((prev) => [
      ...prev.slice(-4), // Keep only the last 5 notifications
      { id: Date.now(), message, type },
    ]);
    setTimeout(() => setNotifications((prev) => prev.slice(1)), 5000); // Hide notification after 5 seconds
  };

  const category = "All"; // Or derive this from the context or state
  const searchName = ""; // Or derive this from the context or state
  const productId = product._id; // Lấy ID của sản phẩm hiện tại

  return (
    <>
      <div>
        <button
          className='btn-back-history'
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faArrowUp} className='fontawe' />
        </button>
      </div>
      <div className='notification-container'>
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            message={notif.message}
            type={notif.type}
          />
        ))}
      </div>
      <div className='product-page'>
        <img src={product.image} alt={product.name} className='product-image' />
        <h1 className='product-name'>{product.name}</h1>
        <p className='product-description'>{product.description}</p>
        <div className='product-prices'>
          {isWeekday(currentTime) && isDiscountTime(currentTime) && (
            <p className='product-price-original'>
              <strike>${product.price.toFixed(2)}</strike>
            </p>
          )}
          <p className='product-price'>${discountedPrice.toFixed(2)}</p>
        </div>
        <p className='product-detail'>{product.detail}</p>
        <ul className='product-meta'>
          <li>{product.metail_1}</li>
          <li>{product.metail_2}</li>
          <li>{product.metail_3}</li>
        </ul>
        <div>
          <button
            className='add-to-cart-btn'
            onClick={() => handleAddToCart(id)}
          >
            Add to Cart
          </button>
          <button className='view-cart-btn' onClick={() => navigate("/cart")}>
            Go to Cart
          </button>
        </div>
      </div>
      <CustomerReviews reviews={customerReviewsData} />
      <FoodDisplay
        category={category}
        searchName={searchName}
        excludeId={productId}
      />

      <AdSlider className='adslider-product' />
    </>
  );
};

export default ProductPage;
