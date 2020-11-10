const mongoose = require("mongoose");

const connectDb = () => {
  if (process.env.MONGODB_URL) {
    return mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }
  throw new Error("Db not found.");
};

module.exports = { connectDb };
