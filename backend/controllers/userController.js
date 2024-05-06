const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
// const cloudinary = require("cloudinary");
const jwt = require('jsonwebtoken')


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });
  const { name, email, password } = req.body;

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
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
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

    res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
});


// update User Profile --shipping details, and many more.
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

  if (req.body.whatToDo === "newAdd" || req.body.whatToDo === "editAdd") {
    const { addressInfoObj, city, state, pincode, whatToDo, addressId } = req.body
    addressInfoObj.residenceCity = city;
    addressInfoObj.residenceState = state;
    addressInfoObj.areaPincode = pincode;
    const email = addressInfoObj.email

    if (email) {
      const isEmailExist = await User.findOne({ "email": email })
      console.log(isEmailExist);
      if (isEmailExist) return next(new ErrorHander("Email already exist, please try again with another email.", 401));
    }

    if (whatToDo === "newAdd") {
      User.updateOne({
        _id: req.user._id
      }, {
        $push: {
          address: addressInfoObj
        }, pincode, city, state, email
      }, async (err) => {
        if (!err) {
          const user = await User.findOne({ _id: req.user._id }).populate({ path: 'cart.product', populate: { path: 'brand', model: 'Brand' }, model: 'Product' });


          return res.status(200).json({
            success: true,
            userAllAddress: user.address,
            msg: "Address saved successfully"
          })
        } else { console.log(err); }
      });
    } else if (whatToDo === "editAdd") {
      User.updateOne({
        _id: req.user._id,
        address: { $elemMatch: { _id: addressId } }
      }, {
        $set: {
          'address.$.receiverName': addressInfoObj.receiverName,
          'address.$.addressNickname': addressInfoObj.addressNickname,
          'address.$.residenceNo': addressInfoObj.residenceNo,
          'address.$.residenceDetail': addressInfoObj.residenceDetail,
          'address.$.residenceCity': addressInfoObj.residenceCity,
          'address.$.residenceState': addressInfoObj.residenceState,
          'address.$.areaPincode': addressInfoObj.areaPincode,
          'address.$.landmark': addressInfoObj.landmark,
          'address.$.shipPhone': addressInfoObj.shipPhone,
        }
      }, async (err) => {
        if (!err) {
          const user = await User.findOne({ _id: req.user._id }).populate({ path: 'cart.product', populate: { path: 'brand', model: 'Brand' }, model: 'Product' });

          await SelectedAddress.deleteOne({ 'bandeKiId': user._id }) // main address delete ho to selected vala bhi delete ho jae...or kuki is address ko edit kr rhe hai to purana vala address selection mese delete krva rhe

          return res.status(200).json({
            success: true,
            userAllAddress: user.address,
            msg: "Address edited successfully"
          })
        } else { console.log(err); }
      })
    }
  }

  const { name, gender, email, whatToDo } = req.body

  //Add and Update name & gender.
  if (!whatToDo && name !== req.user.name || !whatToDo && gender !== req.user.gender || !whatToDo && !gender || !whatToDo && !name) {
    // Use findOneAndUpdate to find and update the document
    User.findByIdAndUpdate({ _id: req.user._id }, { name, gender }, { new: true })
      .then(updatedDocument => {
        if (updatedDocument) {
          console.log('Document updated successfully:')
          return res.status(200).json({
            success: true,
            user: updatedDocument,
            msg: "Profile update successfully"
          })
        } else {
          console.log('Document not found');
        }
      })
      .catch(error => {
        console.error('Error updating document:', error);
      });
  }



  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);

  //   const imageId = user.avatar.public_id;

  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }

  // await User.findByIdAndUpdate({ _id: req.user._id }, { pincode, city, state, timeslot, Delivery_Date }, {
  //   new: true,
  //   runValidators: true,
  //   useFindAndModify: false,
  // }, (err, data) => {
  //   if (!err) {
  //     // console.log(data)
  //     return res.status(200).json({ success: true, data })
  //   } else {
  //     // console.log(err)
  //     return res.status(200).json({ msg: "Something went wrong. Please try again later" })
  //   }
  // })

});





