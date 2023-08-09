const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodAndBeveregesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
      enum: ["food", "beverage", "combo"],
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("foodAndBevereges", FoodAndBeveregesSchema);
