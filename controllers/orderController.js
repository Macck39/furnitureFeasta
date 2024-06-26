

import { asyncError } from '../middlewares/error.js';
import { Order } from '../models/orderModal.js';
import { Product } from '../models/productModal.js';
// import { asyncError}


//! CREATE ORDER

export const createOrder = asyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    } = req.body;

    await Order.create({
        user: req.user._id,
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
    });
    //! we have to to take care of stocks also

    for (let i = 0; i < orderItems.length; i++) {
        const product = await Product.findById(orderItems[i].product);
        product.stock -= orderItems[i].quantity;

        await product.save();
    }

    res.status(200).json({
        success: true,
        message: "Order Placed Successfully!",
    });
});


//! GET MY ORDER

export const getMyOrders = asyncError(async (req, res, next) => {
    console.log("USER ID IN ORDER >>>", req.user._id)
    // my order using user id
    const orders = await Order.find({ user: req.user._id });
    // console.log("order", orders);

    res.status(200).json({
        success: true,
        orders,
    });
});

//! GET ADMIN ORDERS
export const getAdminOrders = asyncError(async (req, res, next) => {
    // my order using user id
    const orders = await Order.find({});
    // console.log("order", orders);

    res.status(200).json({
        success: true,
        orders,
    });
});

//! GET ORDER DETAILS
export const getOrderDetails = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    //    console.log("order detail", order)

    if (!order) next(new ErrorHandler("order not found!", 400));

    res.status(200).json({
        success: true,
        order,
    });
});

//! PROCESS ORDER
export const proccessOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) next(new ErrorHandler("order not found!", 400));

    if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
    else if (order.orderStatus === "Shipped") {
        order.orderStatus = "Delivered";
        order.deliveredAt = new Date(Date.now());
    } else {
        return next(new ErrorHandler("Order is allready delivered!", 400));
    }

    await order.save();
    res.status(200).json({
        success: true,
        message: "Order Processed successfully!",
    });
});
