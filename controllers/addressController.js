import { asyncError } from "../middlewares/error.js";
import { Address } from "../models/addressModal.js";
import ErrorHandler from "../utils/error.js";


//! get all address
export const getAllAddress = asyncError(async (req, res, next) => {
    
    const allAddress = await Address.find({user : req.user._id});
    res.status(200).json({
        success: true,
        data : allAddress,
    });
});

//! add new address
export const createAddress = asyncError(async (req, res, next) => {
    const { addressLine1, street, landmark, city, state, postalCode } = req.body;

  
    if (!addressLine1) return next(new ErrorHandler("addressLine1 can't be empty ", 400));
    if (!street) return next(new ErrorHandler("street can't be empty ", 400));
    if (!landmark) return next(new ErrorHandler("landmark can't be empty ", 400));
    if (!city) return next(new ErrorHandler("city can't be empty ", 400));
    if (!state) return next(new ErrorHandler("state can't be empty ", 400));
    if (!postalCode) return next(new ErrorHandler("postalCode can't be empty ", 400));
  
  
    await Address.create({
        addressLine1, street, landmark, city, state, postalCode, user : req.user._id
    });

  
    res.status(200).json({
      success: true,
      message: "Address Added!",
    });
  });


//! update address 
export const updateAddress = asyncError(async (req, res, next) => {
    const { addressLine1, street, landmark, city, state, postalCode } = req.body;
    const { addressId } = req.params;

    const foundAddress = await Address.findById({ _id : addressId});

   if (!foundAddress) return next(new ErrorHandler("Address not Found!", 400));

   if (addressLine1) foundAddress.addressLine1 = addressLine1;
   if (street) foundAddress.street = street;
   if (landmark) foundAddress.landmark = landmark;
   if (city) foundAddress.city = city;
   if (state) foundAddress.state = state;
   if (postalCode) foundAddress.postalCode = postalCode;
 
   await foundAddress.save();
 
   res.status(200).json({
     success: true,
     message: "Address Updated!",
   });

  
  });


//! delete address
export const deleteAddress = asyncError(async (req, res, next) => {
    const { addressId } = req.params;

    const foundAddress = await Address.findByIdAndDelete({ _id : addressId});

   if (!foundAddress) return next(new ErrorHandler("Address not Found!", 400));
 
 
   res.status(200).json({
     success: true,
     message: "Address deleted!",
   });

  
  });