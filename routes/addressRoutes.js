import express from "express";;
import { getAllAddress, createAddress , updateAddress, deleteAddress} from "../controllers/addressController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const addressRouter = express.Router();

addressRouter.get("/all", isAuthenticated, getAllAddress)
addressRouter.post("/new",isAuthenticated, createAddress)
addressRouter.put("/edit/:addressId", isAuthenticated, updateAddress)
addressRouter.delete("/remove/:addressId",deleteAddress, deleteAddress)



export default addressRouter;