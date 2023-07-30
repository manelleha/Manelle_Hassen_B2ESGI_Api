
const { validationResult } = require('express-validator/check');//utilise express-validator pour vérifier si les données d'inscription envoyées par le client sont valides
const Event = require('../models/event');

exports.getEvents = (req, res, next) => {
  Event.find()
    .then(events => {
      res.status(200).json({ message: 'Liste des événements récupérée avec succès.', events: events });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.creerEvent = (req, res, next) => {
  const erreurs = validationResult(req);
  if (!erreurs.isEmpty()) {
    const erreur = new Error('La validation a échoué, les données saisies sont incorrectes.');
    erreur.statusCode = 422;
    throw erreur;
  }

  const titre = req.body.titre;
  const description = req.body.description;
  const date = req.body.date; // Date récupérée depuis le corps de la requête

  const event = new Event({
    titre: titre,
    description: description,
    date: date
  });

  event
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Événement créé avec succès!',
        event: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
// pour récupérer un évènement
exports.getEvent = (req, res, next) => {
  const idEvent = req.params.idEvent;

  Event.findById(idEvent)
    .then(event => {
      if (!event) {
        const erreur = new Error('Événement introuvable.');
        erreur.statusCode = 404;
        throw erreur;
      }

      res.status(200).json({ message: 'Événement récupéré avec succès.', event: event });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.majEvent = (req, res, next) => {
  const erreurs = validationResult(req);
  if (!erreurs.isEmpty()) {
    const erreur = new Error('La validation a échoué, les données saisies sont incorrectes.');
    erreur.statusCode = 422;
    throw erreur;
  }

  const idEvent = req.params.idEvent;
  const titre = req.body.titre;
  const description = req.body.description;
  const date = req.body.date; // Nouvelle date récupérée depuis le corps de la requête

  Event.findById(idEvent)
    .then(event => {
      if (!event) {
        const erreur = new Error('Événement introuvable.');
        erreur.statusCode = 404;
        throw erreur;
      }

      event.titre = titre;
      event.description = description;
      event.date = date; // Mise à jour de la date

      return event.save();
    })
    //c'est une promise
    .then(result => {
      res.status(200).json({ message: 'Événement mis à jour!', event: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.supprimerEvent = (req, res, next) => {
  const idEvent = req.params.idEvent;

  Event.findByIdAndRemove(idEvent)
    .then(result => {
      if (!result) {
        const erreur = new Error('Événement introuvable.');
        erreur.statusCode = 404;
        throw erreur;
      }

      res.status(200).json({ message: 'Événement supprimé avec succès.', event: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
