const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodCategorySchema = new Schema({
    CategoryName: {
        type: String,
        required: true
    }
});

const CategoryModel = mongoose.model('Categories', FoodCategorySchema);
module.exports = CategoryModel;