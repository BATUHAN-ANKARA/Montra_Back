const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "JPY", "CNY", "TRY"],
    },
    logo: {
      type: String,
      default:
        "https://res.cloudinary.com/dg9s4kl26/image/upload/v1617112142/avatars/default-avatar.png",
    },
    color: {
      type: String,
      default: "#000000",
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    minimize: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema, "wallet");

module.exports = Wallet;
