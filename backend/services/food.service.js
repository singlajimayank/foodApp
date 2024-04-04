const ItemModel = require('../models/Items.model');
const CategoryModel = require('../models/Categories.model');

class FoodService {
    static async foodItems() {
        try {
            const items = await ItemModel.find({});
            return items;
        } catch (error) {
            console.error('Error fetching food items: ', error);
            throw error;
        }
    }

    static async foodCategories() {
        try {
            const categories = await CategoryModel.find({});
            return categories;
        } catch (error) {
            console.error('Error fetching food items: ', error);
            throw error;
        }
    }
}

module.exports = FoodService;