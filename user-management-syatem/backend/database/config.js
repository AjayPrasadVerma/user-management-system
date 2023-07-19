const mongoose = require("mongoose");

const Connection = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully...");
  } catch (error) {
    console.log("database connection failed " + error);
  }
};

module.exports = Connection;
