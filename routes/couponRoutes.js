import express from "express";
import { addCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "../controllers/couponController.js";

const couponRouter = express.Router();

couponRouter.post('/coupon/add' , addCoupon)
couponRouter.put('/coupon/update/:id' , updateCoupon)
couponRouter.get('/coupon/all' , getAllCoupons)
couponRouter.get('/coupon' , getSingleCoupon)
couponRouter.delete('/coupon/delete/:id' , deleteCoupon)


export default couponRouter