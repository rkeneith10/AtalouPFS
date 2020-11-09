const mongoose = require("mongoose");

const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    name: { type: String, unique: true }, // String is shorthand for {type: String}
    email: { type: String, lowercase: true, trim: true },
    category: [
      {
        name: String,
        description: String,
        parent: String,
      },
    ],
    account: String,
    entity: {
      type: String,
      enum: ["PRIVEE", "GOUV", "ONG"],
      default: "Privee",
    },
    note: String,
    address: [
      {
        city: String,
        street: String,
        country: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
