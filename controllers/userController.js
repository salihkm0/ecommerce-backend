import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { userToken } from "../utils/generateToken.js";

//! user Sign Up

export const signup = async (req, res) => {
  console.log("Sign Up Hitted");
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      street,
      city,
      district,
      state,
      zip,
    } = req.body;

    // Check user is already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({
        message: "User is already exist",
        success: false,
      });
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create new user

    const newUser = new User({
      email,
      firstName,
      lastName,
      phoneNumber,
      address: {
        street,
        city,
        district,
        state,
        zip,
      },
      hashedPassword,
    });

    // save the new user

    const newUserCreated = await newUser.save();

    //check the user is saved

    if (!newUserCreated) {
      return res.json({
        message: "user is not created",
        success: false,
      });
    }

    // generate token
    const token = userToken(newUserCreated);

    //save token in cookie
    res.cookie("token", token);
    res.json({
      message: "Signed successfully!",
      success: true,
      user: newUser,
      token : token
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

//! user Sign In

export const signin = async (req, res) => {
  console.log("Sign In Hitted");
  try {
    const { email, password } = req.body;
    // checking email and password is enterd
    if (!email || !password) {
      return res.json({
        message: "Please enter email and password",
        success: false,
      });
    }

    // find the user using email

    const user = await User.findOne({ email });

    // if the user not found
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
      });
    }

    // check password is maching

    const matchPassword = await bcrypt.compare(password, user.hashedPassword);

    // if password is not matching

    if (!matchPassword) {
      return res.json({
        message: "Password is not correct",
        success: false,
      });
    }

    // generate token using email

    const token = userToken(user);

    //save token in cookie
    res.cookie("token", token);
    res.json({
      message: "Logged in!",
      success: true,
      token: token,
      user: user,

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

//! Get User

export const getUser = async (req, res) => {
  console.log("Get User Hitted");
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User not found");
    }

    res.json({ user });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      err: "Internal Server Error",
      success: false,
    });
  }
};

//! Get All users
export const getAllUsers = async (req, res) => {
  console.log("Get All Users Hitted");
  try {
    const users = await User.find();
    res.json({ success: true, users: users });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      err: "Internal Server Error",
      success: false,
    });
  }
};

//! Update User

export const updateUser = async (req, res) => {
  console.log("Update User Hitted");
  try {
    const userId = req.params.id;
    const {
      firstName,
      lastName,
      phoneNumber,
      street,
      city,
      district,
      state,
      zip,
    } = req.body;

    // check user using user id

    let user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }
    // Update user fields
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          firstName,
          lastName,
          phoneNumber,
          address: {
            city,
            street,
            district,
            state,
            zip,
          },
        },
      },
      { new: true } // Return the updated document
    );
    if (!updateUser) {
      return res.json({
        message: "user is not Updated",
        success: false,
      });
    }

    res.json({
      message: "User profile updated successfully",
      success: true,
      user: updateUser,
    });
    console.log("User profile updated successfully");
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      err: "Internal Server Error",
      success: false,
    });
  }
};

//! check user

export const checkUser = async (req, res) => {
  try {
    const user = req.user;
    console.log("Req.User : ",user );
    if(!user){
      return res.json({message : "User not Found",success : false})
    }
    res.json({message : "User Found",success : true , user})
    console.log(user);
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      err: "Internal Server Error",
      success: false,
    });
  }
};

//! logout

export const logout = async (req, res) => {
  try {
    // res.clearCookie("token" ); // 'token' is the name of the cookie where the JWT is stored
    res.cookie("token", "");
    res.status(200).json({ message: "Logged out successfully" ,success : true});
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      err: "Internal Server Error",
      success: false,
    });
  }
};



//! user profile

export const userProfile = async (req, res) => {
  try {
    const userId = req.user.data;
    if(!userId) {
      return res.status(401).json({
        err: "Not authorized",
        success: false,
        });
    }
    const user = await User.findById(userId);
    console.log(user);
    res.status(200).json({
      user,
      success: true,
      });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      err: "Internal Server Error",
      success: false,
    });
  }
};