const mongoose = require("mongoose");

const { Schema } = mongoose;

const employeSchema = new Schema(
  {
    firstname: String, // String is shorthand for {type: String}
    lastname: String,
    birthday: String,
    phone: String,
    post: String,
    department: String,
    address: {
      city: String,
      street: String,
      country: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employe", employeSchema);
