const FoodService = require('../services/food.service');

class FoodController {
    static async foodItems(_req, res) {
        try {
            const items = await FoodService.foodItems();
            res.status(200).json({ data: items, msg: 'Items fetched Successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    static async foodCategories(_req, res) {
        try {
            const categories = await FoodService.foodCategories();
            res.status(200).json({ data: categories, msg: 'Categories fetched Successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }
}

module.exports = FoodController;