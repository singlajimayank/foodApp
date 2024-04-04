const OrderService = require("../services/orders.service");

class OrderController {
    static async orderData(req, res) {
        try {
            let orderData = req.body.order_data;
            let email = req.body.email;

            let { updatedOrder } = await OrderService.orderData(email, orderData);

            res.status(200).json({ data: updatedOrder, msg: 'Order data added successfully', success: "true" });

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

}

module.exports = OrderController;