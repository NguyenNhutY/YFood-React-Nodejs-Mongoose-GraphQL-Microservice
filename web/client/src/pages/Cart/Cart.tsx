import React, { useState, useRef, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import SecurityInput from "../../components/SecurityInput/SecurityInput";
import { Map } from "immutable";
import IntroTourButton from "../../components/IntroBtn/IntroBtn";
import Notification from "../../components/Notification/Notification";
import ModalCart from "../../components/Modal/ModalCart/ModalCart";
import "./cart.scss";
import { cartSteps } from "../../types";
import { assets } from "../../assets/frontend_assets/assets";
import AdSLider from "../../components/AdSlider/AdSlider";
interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface NotificationType {
  id: number;
  message: string;
  type: "error" | "success";
}

const Cart: React.FC = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalAfterDiscount,
    getSelectedTotalAmount,
    selectedItems,
    setSelectedItems,
    discount,
    setDiscount,
    promoError,
    handlePromoCode,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const promoCodeRef = useRef<HTMLInputElement>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const handleItemSelect = (
    itemId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSelectedItems = new Set(selectedItems);
    if (event.target.checked) {
      newSelectedItems.add(itemId);
    } else {
      newSelectedItems.delete(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allItemIds = food_list.map((item) => item._id);
      setSelectedItems(new Set(allItemIds));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleRemoveClick = (itemId: string) => {
    setItemToRemove(itemId);
    setModalVisible(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message: "Item removed from cart", type: "error" },
      ]);
      setTimeout(() => setNotifications((prev) => prev.slice(1)), 5000);
      setItemToRemove(null);
    }
    setModalVisible(false);
  };

  const handleCancelRemove = () => {
    setItemToRemove(null);
    setModalVisible(false);
  };

  const handlePromoCodeClick = () => {
    const promoCode = promoCodeRef.current?.value || "";
    handlePromoCode(promoCode);
    console.log("PromoCode Clicked", promoCode);
  };

  return (
    <>
    <div className='cart-container'>
      <div >
        <button
          className='btn-back-history'
          onClick={() => window.history.back()}
          data-step='1'
          data-intro='Click here to go back to the previous page.'
        >
          <FontAwesomeIcon icon={faArrowUp} className='fontawe' />
        </button>
        <IntroTourButton className='btn-intro-tour' steps={cartSteps} />
      </div>
      <div className='cart'>
        <div className='notification-container'>
          {notifications.map((notif) => (
            <Notification
              key={notif.id}
              message={notif.message}
              type={notif.type}
            />
          ))}
        </div>
        <div
          className='cart-items-title'
          data-step='2'
          data-intro='Click here to select items from your order.'
        >
          <input
            type='checkbox'
            checked={selectedItems.size === food_list.length}
            onChange={handleSelectAll}
            className='select-all'
          />
          <label className='lagel-img'>Image</label>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item: CartItem) => {
          const itemId = item._id;
          const itemQuantity = Map(cartItems).get(itemId, 0);

          if (itemQuantity > 0) {
            return (
              <div key={itemId} data-step='3' data-intro=''>
                <div className='cart-items-item'>
                  <input
                    type='checkbox'
                    checked={selectedItems.has(itemId)}
                    onChange={(event) => handleItemSelect(itemId, event)}
                    className='select-item'
                  />
                  <img className='img' src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className='quantity-controls'>
                    <button
                      onClick={() => decreaseQuantity(itemId)}
                      className='quantity-button'
                    >
                      -
                    </button>
                    <p className='price'>{itemQuantity}</p>
                    <button
                      onClick={() => increaseQuantity(itemId)}
                      className='quantity-button'
                    >
                      +
                    </button>
                  </div>
                  <p className='price'>${item.price * itemQuantity}</p>
                  <p
                    onClick={() => handleRemoveClick(itemId)}
                    className='cross'
                    data-step='4'
                    data-intro='Click here to remove this item from your cart.'
                  >
                    <img src={assets.cross_icon} alt='' />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className='cart-bottom'>
          <div
            className='cart-total'
            data-step='5'
            data-intro='Review your cart totals here.'
          >
            <h2>Cart Totals</h2>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p className='price'>${getTotalAfterDiscount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p className='price'>${getSelectedTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b className='price'>
                $
                {getTotalAfterDiscount() === 0
                  ? 0
                  : getTotalAfterDiscount() + 2}
              </b>
            </div>
            <hr />
            {selectedItems.size > 0 ? (
              <button
                onClick={() => navigate("/order")}
                className='btn-checkout dot'
              >
                Order
              </button>
            ) : (
              <p className='text-place-order '>Select items to order</p>
            )}
            {selectedItems.size === 0 && (
              <>
                <p className='text-place-order '>
                  There are no products in the cart.
                </p>
                <button
                  onClick={() => navigate("/#explore-menu")}
                  className='btn-back-menu dot'
                >
                  &lt;- Back to Main Menu
                </button>
              </>
            )}
          </div>
          <div className='cart-promocode'>
            {" "}
            <p>If you have a promo code, enter it here</p>{" "}
            <div className='cart-promocode-input'>
              {" "}
              <SecurityInput
                type='text'
                name='promoCode'
                placeholder='Promo code'
                ref={promoCodeRef}
                className='promo-input'
                data-step='7'
                data-intro='Enter your promo code here for discounts.'
              />{" "}
              <button onClick={handlePromoCodeClick}>Submit</button>{" "}
            </div>{" "}
            {promoError && (
              <p
                className={
                  promoError === "Promo code is invalid." ? "error" : "success"
                }
              >
                {" "}
                <br /> {promoError}{" "}
              </p>
            )}{" "}
          </div>
        </div>
      </div>{" "}
      </div>
      <AdSLider />
      {modalVisible && (
        <ModalCart
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}
    </>
  );
};

export default Cart;
