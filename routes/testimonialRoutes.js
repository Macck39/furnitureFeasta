import express from "express";
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonialController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const testimonialRouter = express.Router();

testimonialRouter.get("/all", getAllTestimonials )
testimonialRouter.post("/new", isAuthenticated, createTestimonial )
testimonialRouter.put("/update/:testimonialId",isAdmin, updateTestimonial )
testimonialRouter.delete("/remove/:testimonialId", isAdmin, deleteTestimonial )




export default testimonialRouter;