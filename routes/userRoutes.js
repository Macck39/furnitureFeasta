import express from 'express';
import { register, login, getMyProfile, logout, updateProfile, changePassword, updatePic } from '../controllers/userControllers.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';

const userRouter = express.Router();


userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get('/me',isAuthenticated, getMyProfile)
userRouter.get('/logout',isAuthenticated, logout)


// update profile and chaange password
userRouter.put('/updateprofile', isAuthenticated, updateProfile)
userRouter.put('/changepassword', isAuthenticated, changePassword)
userRouter.put('/updatepic', isAuthenticated, singleUpload, updatePic)




export default userRouter;