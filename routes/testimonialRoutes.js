import express from "express";
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonialController.js";

const testimonialRouter = express.Router();

testimonialRouter.get("/all", getAllTestimonials )
testimonialRouter.post("/new", createTestimonial )
testimonialRouter.put("/update/:testimonialId", updateTestimonial )
testimonialRouter.delete("/remove/:testimonialId", deleteTestimonial )




export default testimonialRouter;