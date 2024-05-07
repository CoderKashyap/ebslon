const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHander("Something is missing or invalid", 400));
  }

  const user = await User.create({
    name,
    email,
    password
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Incorrect Email or Password", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("User does not exist", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});


// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  try {

    if (req.user) {
      res.status(200).json({
        success: true,
        user: req.user,
      });
    } else {
      return next(new ErrorHander("JWT is missing or invalid", 401));
    }

  } catch (error) {
    console.log(error.message)
    return next(new ErrorHander("JWT is missing or invalid", 401));
  }
});


// update User Profile --shipping details, and many more.
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user._id);

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 200,
    crop: "scale",
  });

  // console.log(myCloud);

  avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  user.avatar = avatar;

  user.save().then((result) => {
    if (result) {
      res.status(200).json({
        success: true,
        msg: "Image upload successfully",
      });
    }
  }).catch((error) => {
    console.log(error);
    return next(new ErrorHander("Something went wrong", 400));
  });

});





