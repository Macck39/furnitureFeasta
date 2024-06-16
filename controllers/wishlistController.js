
import { asyncError } from "../middlewares/error.js";
import { Wishlist } from "../models/wishlistModal.js";
import ErrorHandler from "../utils/error.js";

//! all wishlist products
export const AllWishlistProduct = asyncError(async (req, res, next) => {

    const AllWishList = await Wishlist.find({ user: req.user._id }).populate('product');

    res.status(200).json({
        success: true,
        data: AllWishList,
    });
});

//! add product to wishlist

export const addProductToWishList = asyncError(async (req, res, next) => {

    const { productId } = req.params;
    const existingWishList = await Wishlist.findOne({  user : req.user._id, product : productId  });
    if(existingWishList) return next(new ErrorHandler("product Allready Added to WishList!", 400)) 

    const newWishlistItem = await Wishlist.create({
      user :  req.user._id,
      product : productId
    });
    await Wishlist.populate(newWishlistItem, [{ path: 'user', select: 'email' }, { path: 'product' }]);

    res.status(200).json({
        success: true,
       message :"Added to WishList!"
    });
});


//! remove from wishlist

export const removeFromWishList = asyncError(async (req, res, next) => {

    const { productId } = req.params;
  
   const removedWishList =  await Wishlist.findOneAndRemove({user :req.user._id, product : productId });

    if(!removedWishList) return next(new ErrorHandler("Invalid UserId or ProductId!", 400)) 

    res.status(200).json({
        success: true,
       message : "Removed from WishList!"
    });
});

