const mongoose = require("mongoose");

const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
      connectTimeoutMS: process.env.CONNECTION_TIMEOUT,
    });
  } catch (error) {
    throw new Error("Veritabanı bağlantı hatası:", error.message);
  }
};

module.exports = {
  mongooseConnection,
};
