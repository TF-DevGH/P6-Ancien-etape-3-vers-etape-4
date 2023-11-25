/*
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId
    };
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

// Utilisez le middleware dans votre application Express
app.use(authorize());

// Configurez vos routes ici, par exemple :
app.get('/sauces', (req, res) => {
  // Votre logique pour obtenir les sauces
});

// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
*/
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId
    };
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = authorize;
