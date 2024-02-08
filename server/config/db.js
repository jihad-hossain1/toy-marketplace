const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/AnimalToy`
    );
    console.log(
      `\n <------ database connection successfull ------> host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("database connection failed ", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
