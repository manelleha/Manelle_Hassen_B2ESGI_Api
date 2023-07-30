const express = require('express');
const { body } = require('express-validator/check');

const eventController = require('../controllers/event');
const isAuth = require('../middleware/is-auth'); // on importe le middleware d'authentification

const router = express.Router(); // Création d'un routeur Express

router.get('/events', isAuth, eventController.getEvents);

router.post(
  '/event',
  isAuth,// Middleware isAuth pour vérifier l'authentification de l'utilisateur avant de permettre la création d'un événement
  [ //on verifie des paramètres
    body('titre')
      .trim()
      .isLength({ min: 5 }),
    body('description')
      .trim()
      .isLength({ min: 5 }),
    body('date')
      .isISO8601()
      .toDate()
  ],
  eventController.creerEvent
);

// Route pour obtenir un événement spécifique
router.get('/event/:idEvent', isAuth, eventController.getEvent);

// Route pour mettre à jour un événement spécifique
router.put( //gère les requêtes PUT pour l'URL /event/:idEvent
  '/event/:idEvent',
  isAuth,
  [
    body('titre')
      .trim()
      .isLength({ min: 5 }),
    body('description')
      .trim()
      .isLength({ min: 5 }),
    body('date')
      .isISO8601()
      .toDate()
  ],
  eventController.majEvent
);

// Route pour supprimer un événement spécifique
router.delete('/event/:idEvent', isAuth, eventController.supprimerEvent);// gère les requêtes DELETE pour l'URL /event/:idEvent

module.exports = router;// on exporte le routeur
