import Stripe from "stripe";
import { Request, Response } from "express";
import orderModel from "../data/models/orderModel";
import userModel from "../data/models/userModel";

const stripe = new Stripe(process.env.STRIPE_SECKEY_KEY);

const frontend_url = "http://localhost:5173";

const placeOrder = async () => {
  try {
    const newOrder = new orderModel({
      userId: req.user._id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.user._id, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // Ensure the price is in cents (paise)
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80, // Assuming 2 INR delivery charge
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, sessionId: session.id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: message });
  }
};

const verifyOrder = async () => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        status: "Completed",
        payment: true,
      });
      res.json({ success: true, message: "Order placed successfully!" });
    } else {
      await orderModel.findByIdAndUpdate(orderId, {
        status: "Cancelled",
        payment: false,
      });
      res.json({ success: false, message: "Order cancelled!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const userOrders = async () => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getOrderById = async () => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Function to get all orders
const getAllOrders = async () => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Function to get the count of orders by user ID
const getOrderCountByUserId = async () => {
  try {
    const { userId } = req.params;
    const count = await orderModel.countDocuments({ userId });
    res.json({ success: true, count });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Function to get the total order amount by user ID
const getTotalOrderAmountByUserId = async () => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId });
    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    res.json({ success: true, totalAmount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Function to get the count of orders by status
const getOrderCountByStatus = async () => {
  try {
    const { status } = req.params;
    const count = await orderModel.countDocuments({ status });
    res.json({ success: true, count });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  getOrderById,
  getAllOrders,
  getOrderCountByUserId,
  getTotalOrderAmountByUserId,
  getOrderCountByStatus,
};
