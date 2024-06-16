import mongoose from "mongoose";
import { User } from "./userModal.js";
import { Product } from "./productModal.js";

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true
      },
})

export const Wishlist = new mongoose.model("Wishlist", wishlistSchema);
