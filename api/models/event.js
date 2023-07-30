const mongoose = require('mongoose'); //on importe le module mongoose pour interagir avec la bdd
const Schema = mongoose.Schema;


// Le schéma indique à Mongoose comment les documents 
// de ce modèle devraient être structurés dans la base de données MongoDB.
const eventSchema = new Schema(
  {
    titre: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
