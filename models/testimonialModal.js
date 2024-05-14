import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({

    reviewText : {
        type: String,
        required: true
    },
    reviewNumber: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }

})

export const Testimonial = new mongoose.model("Testimonial", testimonialSchema)