const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;