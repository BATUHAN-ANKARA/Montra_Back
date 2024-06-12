const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgetSchema = new Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transport",
        "Entertainment",
        "Health",
        "Education",
        "Clothes",
        "Gifts",
        "Other",
      ],
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "JPY", "CNY"],
    },
    color: {
      type: String,
      default: "#000000",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    minimize: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema, "budget");

module.exports = Budget;
