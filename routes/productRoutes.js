import express from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.js';
import { createProduct, getAllProducts, getProductDetails, updateProduct, addProductImage, deleteProduct, deleteProductImage, addCategory, getAllCategories, deleteCategory, getAdminProducts } from '../controllers/ProductControllers.js';
import { singleUpload } from '../middlewares/multer.js';

const productRouter = express.Router();


productRouter.get("/all", getAllProducts)

productRouter.get("/admin", isAuthenticated, isAdmin, getAdminProducts);

productRouter.post("/new", isAuthenticated, isAdmin, singleUpload, createProduct)

productRouter
    .route("/single/:id")
    .get(getProductDetails)
    .put(isAuthenticated,isAdmin, updateProduct)
    .delete(isAuthenticated, isAdmin, deleteProduct)


productRouter
    .route("/images/:id")
    .post(isAuthenticated, isAdmin, singleUpload, addProductImage)
    .delete(isAuthenticated, isAdmin, deleteProductImage);


    productRouter.post("/category", isAuthenticated, isAdmin, addCategory);

    productRouter.get("/categories", getAllCategories);

    productRouter.delete("/category/:id", isAuthenticated, isAdmin, deleteCategory);


export default productRouter;