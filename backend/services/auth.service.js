const User = require('../models/User.model');

class AuthService {
    static async login(email) {
        try {
            const user = await User.findOne(email);
            return user;
        } catch (error) {
            console.error({ error: 'error in finding user' });
            throw error;
        }
    }
}

module.exports = AuthService;