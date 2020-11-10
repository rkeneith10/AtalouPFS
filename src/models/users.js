const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const {
  roles: { values },
} = require("../constants");

const userSchema = new Schema(
  {
    employe: { type: mongoose.Types.ObjectId, ref: "Employe" },
    username: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    role: { type: String, enum: values },
    status: { type: String, enum: ['Active', 'Inactive'], default: "Active" },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

userSchema.pre("save", async function () {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10;
  return await bcrypt.hash(this.password, saltRounds);
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
