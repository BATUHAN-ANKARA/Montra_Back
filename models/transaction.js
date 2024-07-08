const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["expense", "income"],
    },
    from: {
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
    },
    to: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachments: [
      {
        type: String,
      },
    ],
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "JPY", "CNY"],
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    budget: {
      type: Schema.Types.ObjectId,
      ref: "Budget",
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    minimize: true,
  }
);

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema,
  "transaction"
);

module.exports = Transaction;