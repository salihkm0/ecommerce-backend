import Order from "../models/orderModel.js";


//! Get All orders
export const getAllOrders = async (req, res) => {
  console.log("All Orders Hitted");
  try {
    const user = req.user.data;
    if (!user) {
      return res.json({ message: "User Not Found", success: false });
    }
    const orders = await Order.findOne({ user: req.user.data });
    if (!orders) {
      return res.json({ message: "Orders Not Found", success: false });
    }
    console.log({ orders: orders });
    return res.json({ message: "Orders Found", success: true, orders: orders });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred", success: false });
  }
};
