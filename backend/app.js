/*  : doit toujours être collé à <Définition> [Pour la lisibilité]

❓  : Signifie <Définition>
🛈  : Signifie <Information>
•   : Point sur l'<Explication>
↓ : Toujours mettre sous la 1ère ligne de la dernière <Explication>,de la manière qui suit :
*/

/*/
Définitions des termes :
• app.use = middleware.
• req = requête (nécessaire pour tout type de requête).
• res = réponse.
• next = fonction passant l'éxecution au middleware d'après.
• .json = méthode.

Définitions globales :
- app.use : La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
- CORS (Cross Origin Resource Sharing) : système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents,
ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles.

Notes importantes :
1. Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS), des headers spécifiques de contrôle d'accès
doivent être précisés pour tous vos objets de réponse.
2.Veillez à placer la route POST au-dessus du middleware pour les requêtes GET, car la logique GET interceptera actuellement toutes les requêtes envoyées à votre endpoint
 /api/stuff,étant donné qu'on ne lui a pas indiqué de verbe spécifique. Placer la route POST au-dessus interceptera les requêtes POST,
 en les empêchant d'atteindre le middleware GET.
 _
 _
 _
/*/
// Peut poser un PROBLEME :
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const sauceRoutes = require('./routes/stuff'); // Utilisez un nom plus approprié, comme "sauceRoutes"
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://admin:1234@atlascluster.qx9a4rc.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// Utilisez un chemin plus approprié, par exemple '/api/sauces'
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
