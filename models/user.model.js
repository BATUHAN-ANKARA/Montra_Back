const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dg9s4kl26/image/upload/v1617112142/avatars/default-avatar.png",
    },
    pin: {
      type: String,
      default: "",
    },
    birthDate: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Female but identify as an Apache Attack Helicopter",
        "Female but identify as an E-100 Super Heavy Tank",
      ],
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    minimize: true,
  }
);

const User = mongoose.model("User", userSchema, "user");

module.exports = User;
