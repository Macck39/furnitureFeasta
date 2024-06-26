import { User } from "../models/userModal.js";
import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "../utils/error.js";
import { sendToken, cookieOptions, getDataUri } from "../utils/feature.js";
import cloudinary from 'cloudinary'


//! Register
export const register = asyncError(async (req, res, next) => {
  console.log("working ... 0")
  const { name, email, password, mobile } = req.body;
  console.log("working 1")

  let user = await User.findOne({ email });
  console.log("working 2")

  if (user) return next(new ErrorHandler("User allready exists", 400))
  console.log("working 3")


  let avatar = undefined;
  console.log("working 4")

  if (req.file) {
    // req file
    console.log('working 5')
    const file = getDataUri(req.file);
    const myCloud = await cloudinary.v2.uploader.upload(file.content);

    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }

    // console.log('avatar', avatar)

  }

  console.log("working 6")

  user = await User.create({
    name, email, password, mobile, avatar
  });

  console.log("working 7")




  sendToken(user, res, "registered successfully!", 200);

})


//! login
export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  console.log('PASS 1', email, password)

  const user = await User.findOne({ email });
  console.log("PASS 2", user)
  if (!user) {
    return next(new ErrorHandler("incorrect Email or Password", 400))
  }

  if (!password) {
    return next(new ErrorHandler("incorrect Email or Password", 400))
  }
  const isMatched = await user.comparePassword(password);
  console.log("PASS 3", isMatched)
  if (!isMatched) {
    return next(new ErrorHandler("incorrect Email or Password", 400))
  }
  console.log("pass 4")

  // jwt token 
  const token = user.generateToken()

  sendToken(user, res, `welcome back!`, 200)
  console.log("pass 5")

});





//! PROFILE
export const getMyProfile = asyncError(async (req, res, next) => {

  const user = await User.findById(req.user._id);

  console.log("profile", user)

  res.status(200).json({
    success: true,
    user
  })

})


//! LOGOUT
export const logout = asyncError(async (req, res, next) => {

  // const user = await User.findById(req.user._id);

  res.status(200).cookie("token", "", {
    ...cookieOptions,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Logged Out Successfully!"
  })

})


//! update profile
export const updateProfile = asyncError(async (req, res, next) => {

  const user = await User.findById(req.user._id);

  const { name, email, mobile } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (mobile) user.mobile = mobile;


  await user.save();
  // here password in not changing rgt even that pre.save() function is invoking and hashing the password. so need to modify

  res.status(200).json({
    success: true,
    message: "Profile updated successfully!"
  })

})





//! change password 

export const changePassword = asyncError(async (req, res, next) => {

  const user = await User.findById(req.user._id);

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) return next(new ErrorHandler("Please Enter Old and new Password", 400))

  console.log("testing...1")
  const isMatched = await user.comparePassword(oldPassword);

  console.log("testing...2")

  if (!isMatched) return next(new ErrorHandler("Incorrect Old Password", 400))

  user.password = newPassword;

  await user.save()
  // password will be hashed automatically
  // whenever user.save() function will invoke the save function will automatically will be invoke which is written in models file

  res.status(200).json({
    success: true,
    message: "Password changed Successfully!"
  })

})


//! UPDATE PIC
export const updatePic = asyncError( async(req, res ,next)=>{

  const user = await User.findById(req.user._id);
  // console.log("user in update pic", user)

  let avatar = undefined;
  const file = getDataUri(req.file);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id)
  const myCloud = await cloudinary.v2.uploader.upload(file.content);

  avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url
  }
  console.log("avatar", avatar)

  res.status(200).json({
    success : true,
    user
  })

})
