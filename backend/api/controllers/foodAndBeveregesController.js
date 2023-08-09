// Author - Roshil Ka Patel (B00917345)

const response = require("../../utils/response");
const FoodAndBeveragesModel = require("../../models/FoodAndBevereges");
const uploadImage = require("../../utils/cloudinary");

const getFoodItems = async (req, res) => {
  const data = await FoodAndBeveragesModel.find({ isActive: true });
  return response(res, 200, true, data);
};

const getAllFoddItems = async (req, res) => {
  const data = await FoodAndBeveragesModel.find();
  return response(res, 200, true, data);
};

const getFoodItem = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return response(res, 400, false, { message: "id is required" });
  }
  const data = await FoodAndBeveragesModel.findById(id);
  response(res, 200, true, data);
};

const addFoodItem = async (req, res) => {
  const { file } = req;
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category || !file) {
    return response(res, 400, false, {
      message: "file, name, description, price and category are required.",
    });
  }
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
    const imageData = await uploadImage(dataURI);

    const dataItem = new FoodAndBeveragesModel({
      name,
      description,
      price,
      category,
      imageUrl: imageData.url,
    });

    await dataItem.save();

    response(res, 200, true, {
      message: "Item uploaded successfully",
      itemData: dataItem,
    });
  } catch (error) {
    response(res, 500, false, { message: "Something went wrong", error });
  }
};

const updateFoodItem = async (req, res) => {
  const { file } = req;
  const updateFields = req.body;
  if (!updateFields.id) {
    return response(res, 400, false, { message: "Id is required." });
  }

  try {
    const data = await FoodAndBeveragesModel.findById(updateFields.id);

    if (file) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;
      const imageData = await uploadImage(dataURI);
      data.imageUrl = imageData.url;
    }

    Object.keys(updateFields).forEach((field) => {
      data[field] = updateFields[field];
    });
    await data.save();
    return response(res, 200, true, {
      message: "Item updated successfully",
      itemData: data,
    });
  } catch (error) {
    response(res, 500, false, { message: "Something went wrong" });
  }
};

const changeItemStatus = async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return response(res, 400, false, {
      message: "id and status are required.",
    });
  }
  try {
    const updatedData = await FoodAndBeveragesModel.findByIdAndUpdate(id, {
      $set: {
        isActive: status === "true" ? true : false,
      },
    });

    return response(res, 200, true, {
      message: "Item updated successfully",
      itemData: updatedData,
    });
  } catch (error) {
    response(res, 500, false, { message: "Something went wrong" });
  }
};
const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return response(res, 400, false, {
      message: "id is required.",
    });
  }
  try {
    const deleted = await FoodAndBeveragesModel.findByIdAndDelete(id);
    if (!deleted) {
      return response(res, 400, false, { message: "Invalid Id." });
    }

    return response(res, 200, true, { message: "Item deleted successfully." });
  } catch (error) {
    response(res, 400, false, { message: "Invalid Id." });
  }
};

module.exports = {
  getFoodItems,
  getFoodItem,
  addFoodItem,
  deleteItem,
  changeItemStatus,
  updateFoodItem,
  getAllFoddItems,
};
