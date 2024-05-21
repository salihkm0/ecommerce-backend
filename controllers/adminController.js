import bcrypt from "bcrypt";
import Admin from "../models/adminModel.js";
import { adminToken } from "../utils/adminToken.js";


//! admin signup
export const signup = async (req, res) => {
  console.log("Admin signup hitted");
  try {
    const { firstName, lastName, email, password } = req.body;

    //check admin is already exist
    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
      return res.json({
        message: "Admin is already exist",
        success: false,
      });
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new admin

    const newAdmin = new Admin({
      email,
      firstName,
      lastName,
      hashedPassword,
    });

    // save the new admin

    const newAdminCreated = await newAdmin.save();

    //check the admin is saved

    if (!newAdminCreated) {
      return res.json({
        message: "Admin is not created",
        success: false,
      });
    }

    // generate token
    const token = adminToken(newAdminCreated);

    //save token in cookie
    res.cookie("token", token);
    res.json({
      message: "Signed successfully!",
      success: true,
      user: newAdmin,
    });
    console.log("token : ", token);
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


//! admin signin
export const signin = async (req, res) => {
  console.log("Admin sign in hitted");
  try {
    const { email, password } = req.body;
    // check if email and password is provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
        success: false,
      });
    }
    // check if user exists
    const admin = await Admin.findOne({ email });
    console.log(admin);
    if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
        success: false,
      });
    }
    // check if password is correct
    const isMatchPassword = await bcrypt.compare(password, admin.hashedPassword);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    // generate token
    const token = adminToken(admin);
    res.cookie("token", token);
    res.json({
      message: "Signed in successfully!",
      success: true,
      user: admin,
    });
    console.log("token : ", token);
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


//! logout

export const logout = async (req, res) => {
    try {
      res.clearCookie("token"); // 'token' is the name of the cookie where the JWT is stored
      res.status(200).json({ message: "Logged out successfully" ,success : true});
    } catch (error) {
      console.log(error, "Something wrong");
      res.status(500).json({
        err: "Internal Server Error",
        success: false,
      });
    }
  };