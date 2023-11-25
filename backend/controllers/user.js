// 500 = erreur de traitement.
// 401 = erreur d'identification (exemple : le mdp transmis n'est pas correct)
// 200 = le mdp est correct.

const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fonction de hachage du mot de passe
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Fonction d'ajout d'utilisateur à la base de données
const addUserToDatabase = async (email, hashedPassword) => {
    try {
        const user = new User({
            email: email,
            password: hashedPassword
        });
        await user.save();
        return { success: true, message: 'Utilisateur créé !' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Fonction de vérification des informations d'identification
const verifyUserCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return { success: false, error: 'Utilisateur non trouvé !' };
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { success: false, error: 'Mot de passe incorrect !' };
        }
        return { success: true, userId: user._id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Fonction de génération de token
const generateToken = (userId) => {
    return jwt.sign({ userId: userId }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
};

module.exports = {
    hashPassword,
    addUserToDatabase,
    verifyUserCredentials,
    generateToken
};
