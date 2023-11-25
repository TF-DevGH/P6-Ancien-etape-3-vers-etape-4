const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await userCtrl.hashPassword(password);
    const result = await userCtrl.addUserToDatabase(email, hashedPassword);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(400).json({ error: result.error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await userCtrl.verifyUserCredentials(email, password);
    if (result.success) {
        const token = userCtrl.generateToken(result.userId);
        res.status(200).json({ userId: result.userId, token: token });
    } else {
        res.status(401).json({ error: result.error });
    }
});

module.exports = router;