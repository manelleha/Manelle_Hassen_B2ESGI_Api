const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Event = require( './models/event');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dbapi', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Définition des routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);


// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
