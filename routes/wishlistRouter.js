import express from "express";
import { AllWishlistProduct, addProductToWishList, removeFromWishList } from "../controllers/wishlistController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const WishlistRouter = express.Router();

WishlistRouter.get("/all",isAuthenticated, AllWishlistProduct)
WishlistRouter.post("/add/:productId",isAuthenticated,addProductToWishList)
WishlistRouter.delete("/remove/:productId",isAuthenticated, removeFromWishList)


export default WishlistRouter;