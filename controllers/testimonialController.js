import { asyncError } from "../middlewares/error.js";
import { Testimonial } from "../models/testimonialModal.js";
import ErrorHandler from "../utils/error.js";

//! get all address
export const getAllTestimonials = asyncError(async (req, res, next) => {

    const allTestimonials = await Testimonial.find({});

    res.status(200).json({
        success: true,
        data: allTestimonials,
    });
});

//! add testimonial 
export const createTestimonial = asyncError(async (req, res, next) => {
    const { userId, userName, reviewNumber, reviewText } = req.body;
    const allreadyAUser = await Testimonial.find({ userId })

    if (allreadyAUser.length !== 0) return next(new ErrorHandler("User Allready Added Review. ", 400));

    let newTestimonial = await Testimonial.create({
        userId, userName, reviewNumber, reviewText
    })

    await newTestimonial.save()

    res.status(200).json({
        success: true,
        message: "Review Added Successfully!",
    });
});


//! Edit testimonial 
export const updateTestimonial = asyncError(async (req, res, next) => {
    const { userId, userName, reviewNumber, reviewText } = req.body;
    const { testimonialId } = req.params;

    const testimonialFound = await Testimonial.findById({ _id: testimonialId })

    if (!testimonialFound) return next(new ErrorHandler("Invalid Testimonial Id. ", 400));


    if (reviewNumber) testimonialFound.reviewNumber = reviewNumber
    if (reviewText)  testimonialFound.reviewText = reviewText
    if (userId)  testimonialFound.userId = userId
    if (userName)  testimonialFound.userName = userName

    await testimonialFound.save();


    res.status(200).json({
        success: true,
        message: "Review Updated Successfully!",
    });
});
//! delete testimonial 
export const deleteTestimonial = asyncError(async (req, res, next) => {
    const { testimonialId } = req.params;

    const testimonialFound = await Testimonial.findByIdAndDelete({ _id: testimonialId })

    if (!testimonialFound) return next(new ErrorHandler("Invalid Testimonial Id. ", 400));

    res.status(200).json({
        success: true,
        message: "Review deleted Successfully!",
    });
});