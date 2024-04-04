const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model');

class SignUpService {
    static async createUser({ name, email, password, location }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({ name, email, password: hashedPassword, location });
            delete newUser.password;
            return { newUser };
        } catch (error) {
            console.error('Error creating User: ', error.message);
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            console.error('Error fetching user by email: ', error.message);
            throw error;
        }
    }
}

module.exports = SignUpService;