import DataUriParser from 'datauri/parser.js';
import path from 'path';


export const sendToken = (user, res, message, statusCode) => {
  const token = user.generateToken();

  // if secure is true it will work fine with frontend but not with postman and vive versa so right now we are keeping false.
  res.status(statusCode).cookie("token", token, {
    ...cookieOptions,

    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
  }).json({
    success: true,
    message: message,
    // token 
  })
}

export const cookieOptions = {
  secure: false ,
  httpOnly: false,
  sameSite: false,
  // secure: process.env.NODE_ENV === 'Development' ? false : true,
  // httpOnly: process.env.NODE_ENV === 'Development' ? false : true,
  // sameSite: process.env.NODE_ENV === 'Development' ? false : true,
}


export const getDataUri = (file)=>{

  const parser = new DataUriParser();

  const extName = path.extname(file.originalname).toString();

  // console.log("extName", extName)

  return parser.format("extName",file.buffer);
  

}