
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  //   console.log(err)
  // for duplicate error
  if (err.code === 11000) {
    // err.message = ` Duplicate ${err.keyValue.email} entered` 
    err.message = ` Duplicate ${Object.keys(err.keyValue)} entered`; // duplicate email entered 
    err.statusCode = 400;

  }
  // error when id is invalid and asking for product details 
  if (err.name === "CastError") {
    err.message = `Invalid ${err.path}`
  }


  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};


export const asyncError = (passedfunction) => (req, res, next) => {
  Promise.resolve(passedfunction(req, res, next)).catch(next);
};