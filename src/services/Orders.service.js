import axios from "axios";

class OrderService {
    static BASE_URL = process.env.REACT_APP_API_BASE_URL;

    static async orderData(order) {
        const url = `${this.BASE_URL}/orderData`;
        return axios.post(url, order);
    }

}

export default OrderService;