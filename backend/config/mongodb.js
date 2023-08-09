const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const collectionName = "CSCI-5709";

const uri = `mongodb+srv://${username}:${password}@mycluster.b2n6lft.mongodb.net/${collectionName}?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri, options);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Unable to connect to MongoDB", err);
  }
}

module.exports = {
  connect,
};
