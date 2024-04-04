import axios from "axios";

class FoodService {
    static Base_URL = process.env.REACT_APP_API_BASE_URL;

    static items() {
        const url = `${this.Base_URL}/items`;
        return axios.get(url);
    } 

    static categories() {
        const url = `${this.Base_URL}/categories`;
        return axios.get(url);
    } 
}

export default FoodService;