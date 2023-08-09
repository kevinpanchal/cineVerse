const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentsSchema = new Schema(
  {
    session_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    paymentSuccess: {
      type: Boolean,
      required: true,
      default: false,
    },
    items: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: ["movie", "food"],
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payments", PaymentsSchema);
