const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the items collection
const foodItemSchema = new Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    options: [{
        type: mongoose.Schema.Types.Mixed // You can store options as an array of mixed types
    }],
    description: {
        type: String,
        required: true
    }
});

// Create the model for the items collection
const ItemModel = mongoose.model('Item', foodItemSchema);

module.exports = ItemModel;