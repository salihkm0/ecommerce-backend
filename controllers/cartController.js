import { Cart } from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// add to cart
export const addToCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    return res
      .status(404)
      .json({ message: "Product not found", success: false });
  }
  const cart = await Cart.findOne({ user: req.user.data });
  if (!cart) {
    const newCart = new Cart({
      user: req.user.data,
      products: [
        {
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.image,
          //countInStock: product.countInStock,
        },
      ],
      totalPrice: product.price * quantity,
      totalQuantity: quantity,
    });
    await newCart.save();
    res.status(201).json({ message: "Product added to cart", success: true });
  } else {
    const productInCart = cart.products.find(
      (p) => p.product.toString() === id
    );
    if (productInCart) {
      productInCart.quantity += quantity;
      cart.totalPrice = cart.totalPrice + product.price * quantity;
      cart.totalQuantity = cart.totalQuantity + quantity;
      await cart.save();
      res
        .status(200)
        .json({ message: "Product quantity updated", success: true });
    } else {
      cart.products.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        // countInStock: product.countInStock,
      });
      cart.totalPrice = cart.totalPrice + product.price * quantity;
      cart.totalQuantity = cart.totalQuantity + quantity;
      await cart.save();
      res.status(201).json({ message: "Product added to cart", success: true });
    }
  }
};

//get cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.data });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found", success: false });
  }
  res.status(200).json(cart);
};

// update cart
export const updateCart = async (req, res) => {
  const { id, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.data });
  const product = await Product.findById(id);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found", success: false });
  }
  const productInCart = cart.products.find((p) => p.product.toString() === id);
  if (productInCart) {
    productInCart.quantity += quantity;
    cart.totalPrice = cart.totalPrice + product.price * quantity;
    cart.totalQuantity = cart.totalQuantity + productInCart.quantity;
    await cart.save();
    res
      .status(200)
      .json({ message: "Product quantity updated", success: true });
  } else {
    return res
      .status(404)
      .json({ message: "Product not found", success: false });
  }
};

// delete cart
export const deleteCart = async (req, res) => {
  const cart = await Cart.findOneAndDelete({ user: req.user.data });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found", success: false });
  }
  res.status(200).json({ message: "Cart deleted", success: true });
};

// delete Cart Product
export const deleteCartProduct = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.data });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found", success: false });
  }
  const product = cart.products.find(
    (p) => p.product.toString() === req.params.id
  );
  if (product) {
    cart.totalPrice = cart.totalPrice - product.price * product.quantity;
    cart.totalQuantity = cart.totalQuantity - product.quantity;
    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.id
    );
    await cart.save();
    res.status(200).json({ message: "Product deleted", success: true });
  } else {
    return res
      .status(404)
      .json({ message: "Product not found", success: false });
  }
};

// checkout
export const checkout = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.data });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found", success: false });
  }
  const order = new Order({
    user: req.user.data,
    products: cart.products,
    totalAmount: cart.totalPrice,
    totalQuantity: cart.totalQuantity,
    shippingAddress : req.body.shippingAddress
  });
  await order.save();
  await Cart.findOneAndDelete({ user: req.user.data });
  res.status(200).json({ message: "Order placed", success: true });
};
