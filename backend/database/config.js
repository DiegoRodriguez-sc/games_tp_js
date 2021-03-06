const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - vea logs");
  }
};

module.exports = {
  dbConnection,
};