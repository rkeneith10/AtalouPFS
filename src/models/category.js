const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name:  { type: String, unique: true, required: true },
  description: String,
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Category', categorySchema);