import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name Should have atleast 3 chars"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
     validate: validator.isEmail,
    unique: [true, "Email Allready Exists"],
  },
  mobile: {
    type: Number,
    required: [true, "Please Enter Mobile Number"],
    minLength: [10, "Name Should have 10 digits"],
    unique: [true, "Mobile Allready Exists"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [8, "Password Should have atleast 8 chars"],
  },
  // confirmpassword: {
  //   type: String,
  //   required: [true, "Please Enter Password"],
  //   minLength: [8, "Confirm Password Should have atleast 8 chars"],
  // },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  address: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  pinCode: {
    type: Number,
    // required: true,
  },

  avatar: {
    public_id: String, // will fetch from cloudnary 
    url: String,
  },
});

// before saving data password should be bcrypt
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return  next()
  this.password = await bcrypt.hash(this.password, 10);
  // this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
  // it will return boolean either true | false
};

//JWT Authentication
const token = userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

console.log("token in user model", token)
// user model
export const User = mongoose.model("users", userSchema);
