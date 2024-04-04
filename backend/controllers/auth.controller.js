const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const AuthService = require('../services/auth.service');

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const requiredFields = [email, password];
            if (!requiredFields.every(Boolean)) {
                return res.status(400).json({ error: 'Please provide all the fields' });
            }

            const user = await AuthService.login({ email });
            if (!user) {
                return res.status(400).json({ error: 'Try logging with correct email' })
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: 'Try logging with correct password' })
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(payload, jwtSecretKey);
            return res.status(200).json({ data: user, token: token, msg: 'Login Successful' });

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }
}

module.exports = AuthController;