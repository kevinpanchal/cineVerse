const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dxyiyxmui",
  api_key: "261346293194639",
  api_secret: "TjaRwH4jWsKLqIcExHqVvC0vDfw",
});

const uploadImage = async (imageUrl) => {
  return await cloudinary.v2.uploader.upload(
    imageUrl,
    { resource_type: "auto" },
    (error, result) => {
      if (error) {
        throw new Error(error);
      }
      return result;
    }
  );
};

module.exports = uploadImage;
