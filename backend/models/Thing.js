const mongoose = require('mongoose');

/*Schéma de données avec toutes les informations dont nos objets auront besoin
(La méthode "Schema" de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.) :                                                                                                   */

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

//Exportation du modèle (La méthode "model" transforme ce modèle en un modèle utilisable.):
module.exports = mongoose.model('Thing', thingSchema);

/* 
Ce modèle permet non seulement d'appliquer notre structure de données,
mais aussi de simplifier les opérations de lecture et d'écriture dans la base de données.
*/