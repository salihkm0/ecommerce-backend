import Address from "../models/addressModel.js";

export const addAddress = async (req, res) => {
  try {
    const {
      addressLine1,
      addressLine2,
      landmark,
      city,
      district,
      state,
      postalCode,
    } = req.body;

    const userId = req.user.data;
    if (!userId) {
      return res.json({ message: "user not found", success: false });
    }
    const userAddressExist = await Address.findOne({ user: userId });

    console.log("Address : ", userAddressExist);
    if (!userAddressExist) {
      const newUserAddress = new Address({
        user: userId,
        addresses: {
          addressLine1,
          addressLine2,
          landmark,
          city,
          district,
          state,
          postalCode,
        },
      });
      const savedAddress = await newUserAddress.save();
      if (!savedAddress) {
        return res.json({ message: "Address not Saved", success: false });
      }
      return res.json({
        message: "Address Saved",
        success: true,
        Address: savedAddress,
      });
    } else {
      userAddressExist.addresses.push({
        addressLine1,
        addressLine2,
        landmark,
        city,
        district,
        state,
        postalCode,
      });
    }
    const savedAddress = await userAddressExist.save();
    if (!savedAddress) {
      return res.json({ message: "Address not Saved", success: false });
    }
    return res.json({
      message: "Address Saved",
      success: true,
      Address: savedAddress,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getUserAddress = async (req, res) => {
  try {
    const userId = req.user.data;
    const address = await Address.findOne({ user: userId });
    if (!address) {
      return res.json({ message: "Address not Found", success: false });
    }
    return res.json({
      message: "Addresses found",
      success: true,
      Addresses: address.addresses,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
