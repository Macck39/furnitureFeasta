
import express from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.js';
import { createOrder, getAdminOrders, getMyOrders, getOrderDetails, proccessOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();


orderRouter.post("/new", isAuthenticated, createOrder);
orderRouter.get("/my", isAuthenticated, getMyOrders);

orderRouter.get("/admin", isAuthenticated, isAdmin, getAdminOrders);

orderRouter
  .route("/single/:id")
  .get(isAuthenticated, getOrderDetails)
  .put(isAuthenticated, isAdmin, proccessOrder);






export default orderRouter;