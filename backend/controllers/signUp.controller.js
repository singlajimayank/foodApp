const SignUpService = require('../services/signUp.service');

class SignUpController {
    static async createUser(req, res) {
        const { name, email, password, location } = req.body;
        try {
            const requiredFields = [name, email, password, location];
            if (!requiredFields.every(Boolean)) {
                return res.status(400).json({ error: 'Please provide all the fields' });
            }

            const existingUser = await SignUpService.getUserByEmail(email);
            if (existingUser) {
                return res.json({ success: false, msg: 'Email already exists' });
            }

            const { newUser } = await SignUpService.createUser({ name, email, password, location });
            res.json({ data: newUser, success: true, msg: 'User Created Successfully' });
        } catch (error) {
            console.error('Unable to create user: ${email}', error);
            res.status(500).json({ error: 'Internal Server EError' });
        }
    }
}

module.exports = SignUpController;