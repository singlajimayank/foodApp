const OrderModel = require('../models/Orders.model')

class OrderService {
    static async orderData(email, orderData) {
        try {
            let existingId = await OrderModel.findOne({ email });
            let updatedOrder;

            if (!existingId) {
                updatedOrder = await OrderModel.create({ email, order_data: [orderData] });
            } else {
                updatedOrder = await OrderModel.findOneAndUpdate(
                    { email },
                    { $push: { order_data: orderData } },
                    { new: true }
                );
            }

            return updatedOrder;
        } catch (error) {
            console.error('Error adding order Data: ', error);
            throw error;
        }

    }

}

module.exports = OrderService;