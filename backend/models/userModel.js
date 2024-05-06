const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cartSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
  individualTotal: { type: Number },
  individualTotalOnMrp: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({

  cart: [cartSchema],
  name: {
    type: String,
    // required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },

  email: {
    type: String,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  accDelReq: {
    type: Boolean,
    default: false,
  },

  accDelReqDate: {
    type: Date,
  },

  accDelReqReason: {
    type: String
  },

  loginotp: {
    type: String,
    // required: [true, "Please Enter Login Otp"],
    minLength: [5, "Otp should have 5 characters"],
    select: false,
  },

  loginOtpExpire: Date,

  password: {
    type: String,
    // required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,    // select false se jb bhi hm user ka data access karenge password nahi ayega
  },

  bankDetails: [{
    account_holder_name: { type: String },
    bank_name: { type: String },
    account_number: { type: String },
    IFSC: { type: String },
  }],

  // cart: [
  //   {
  //     product: { type: Schema.Types.ObjectId, ref: 'Product' },
  //     quantity: { type: Number, default: 1 },
  //     individualTotal: { type: Number },
  //     individualTotalOnMrp: { type: Number }
  //   }
  // ],

  wallet: {
    totalPointMoney: { type: Number, default: 0 },
    transaction: [
      {
        pointMoney: { type: Number },
        transactionType: { type: String },   // credit or debit
        transactionReason: { type: String },
        order: { type: Schema.Types.ObjectId, ref: 'Order' },
        createdAt: { type: Date, default: Date.now },
        expireAndInactive: { type: Boolean },                 // Expire or inactive status 
      }
    ]
  },

  gender: {
    type: String,
    default: "male"
  },


  pincode: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },

  address: [
    {
      receiverName: { type: String },
      addressNickname: { type: String },
      residenceNo: { type: String },
      residenceDetail: { type: String },
      residenceCity: { type: String },
      residenceState: { type: String },
      areaPincode: { type: String },
      landmark: { type: String },
      shipPhone: { type: String },
    }
  ],

  role: {
    type: String,
    default: "user",
  },

  referralCode: {
    selfCode: { type: String },
    referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    activeReferrals: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },


  saveForLater: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });




userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});



// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};




module.exports = mongoose.model("User", userSchema);
