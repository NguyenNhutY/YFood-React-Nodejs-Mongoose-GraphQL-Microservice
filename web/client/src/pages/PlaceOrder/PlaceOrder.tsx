import React, { useState, useContext, useCallback, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StoreContext } from "../../context/StoreContext";
import ModalCompleted from "../../components/Modal/ModalCompleted/ModalCompleted";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import SecurityInput from "../../components/SecurityInput/SecurityInput";
import IntroTourButton from "../../components/IntroBtn/IntroBtn";
import introJs from "intro.js";
import { placeOrderIntroSteps } from "../../types";
import "./placeOrder.scss";

const PlaceOrder = () => {
  const { getSelectedTotalAmount, cartItems } = useContext(StoreContext);
  const [showModalCompleted, setShowModalCompleted] = useState(false);
  const hasItemsInCart = Object.keys(cartItems).some(
    (key) => cartItems[key] > 0
  );

  const handleGoBack = () => window.history.back();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip code is required"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Order submitted:", values);
    setShowModalCompleted(true);
    setSubmitting(false);
  };

  const totalAmount = getSelectedTotalAmount();
  const deliveryFee = totalAmount === 0 ? 0 : 2;
  const finalTotal = totalAmount + deliveryFee;

  const startIntroTour = useCallback(() => {
    introJs()
      .setOptions({
        steps: placeOrderIntroSteps,
        showStepNumbers: true,
        showBullets: true,
      })
      .start();
  }, []);

  useEffect(() => {
    // Optionally start introJs tour on component mount
    // startIntroTour();
  }, [startIntroTour]);

  return (
    <div className='place-order-container'>
      <button
        className='btn-back-history'
        onClick={handleGoBack}
        aria-label='Go back'
      >
        <FontAwesomeIcon icon={faArrowUp} className='fontawe' />
      </button>

      <IntroTourButton
        className='btn-intro-order'
        steps={placeOrderIntroSteps}
      />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          emailAddress: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className='place-order' id='placeForm'>
            <div className='place-order-left'>
              <p className='title'>Delivery Information</p>
              <div className='multi-fields'>
                <Field
                  type='text'
                  name='firstName'
                  as={SecurityInput}
                  placeholder='First name'
                />
                <ErrorMessage
                  name='firstName'
                  component='div'
                  className='error'
                />
                <Field
                  type='text'
                  name='lastName'
                  as={SecurityInput}
                  placeholder='Last name'
                />
                <ErrorMessage
                  name='lastName'
                  component='div'
                  className='error'
                />
              </div>
              <Field
                type='email'
                name='emailAddress'
                as={SecurityInput}
                placeholder='Email address'
              />
              <ErrorMessage
                name='emailAddress'
                component='div'
                className='error'
              />
              <Field
                type='text'
                name='street'
                as={SecurityInput}
                placeholder='Street'
              />
              <ErrorMessage name='street' component='div' className='error' />
              <div className='multi-fields'>
                <Field
                  type='text'
                  name='city'
                  as={SecurityInput}
                  placeholder='City'
                />
                <ErrorMessage name='city' component='div' className='error' />
                <Field
                  type='text'
                  name='state'
                  as={SecurityInput}
                  placeholder='State'
                />
                <ErrorMessage name='state' component='div' className='error' />
              </div>
              <div className='multi-fields'>
                <Field
                  type='text'
                  name='zipCode'
                  as={SecurityInput}
                  placeholder='Zip code'
                />
                <ErrorMessage
                  name='zipCode'
                  component='div'
                  className='error'
                />
                <Field
                  type='text'
                  name='country'
                  as={SecurityInput}
                  placeholder='Country'
                />
                <ErrorMessage
                  name='country'
                  component='div'
                  className='error'
                />
              </div>
              <Field
                type='tel'
                name='phone'
                as={SecurityInput}
                placeholder='Phone'
              />
              <ErrorMessage name='phone' component='div' className='error' />
            </div>
            <div className='place-order-right'>
              <div className='cart-total'>
                <h2>Cart Totals</h2>
                <div>
                  <div className='cart-total-details'>
                    <p>Subtotal</p>
                    <p className='price'>${totalAmount}</p>
                  </div>
                  <hr />
                  <div className='cart-total-details'>
                    <p>Delivery Fee</p>
                    <p className='price'>${deliveryFee}</p>
                  </div>
                  <hr />
                  <div className='cart-total-details'>
                    <p>Total</p>
                    <p className='price'>${finalTotal}</p>
                  </div>
                </div>
                {hasItemsInCart ? (
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={
                      "text-place-order" && totalAmount === 0 ? "" : "dot"
                    }
                  >
                    PROCEED TO CHECKOUT
                  </button>
                ) : (
                  <div>
                    <p className='text-place-order'>
                      There are no products in the cart.
                    </p>
                    <button className='text-place-order'>
                      <Link to='/#explore-menu' className='dot btn-back-menu'>
                        &lt;- Back to Main Menu
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {showModalCompleted && (
              <ModalCompleted
                formData={values}
                total={finalTotal}
                onClose={() => setShowModalCompleted(false)}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PlaceOrder;
