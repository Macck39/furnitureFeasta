

import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  subcategory: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

export const Subcategory = mongoose.model('Subcategory', subcategorySchema);

const schema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please Enter Category"],
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Subcategory
  }]

});

export const Category = mongoose.model("Category", schema);