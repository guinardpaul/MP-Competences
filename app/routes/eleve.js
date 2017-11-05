const mongoose = require('mongoose');
const Eleve = require('../models/eleves');

module.exports = (router) => {

  router.get('/eleves', (req, res, next) => {
    Eleve.find((err, eleves) => {
      if (err) return next(err);

      return res.status(200).json({
        success: true,
        obj: eleves
      });
    });
  });

  router.get('/eleves/classe/:classe', (req, res, next) => {
    if (!req.params.classe) {
      return res.status(409).json({
        success: false,
        message: 'Classe id not provided'
      });
    } else {
      Eleve.find({ classe: req.params.classe }, (err, eleves) => {
        if (err) return next(err);

        if (!eleves) {
          return res.status(400).json({
            success: false,
            message: 'eleves not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: eleves
        });
      });
    }
  });

  router.get('/eleves/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(409).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Eleve.findById(req.params.id, (err, eleve) => {
        if (err) return next(err);

        if (!eleve) {
          return res.status(400).json({
            success: false,
            message: 'eleve not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: eleve
        });
      });
    }
  });

  router.post('/eleves', (req, res, next) => {
    if (!req.body.nom) {
      return res.status(409).json({
        success: false,
        message: 'nom not provided'
      });
    } else if (!req.body.prenom) {
      return res.status(409).json({
        success: false,
        message: 'prenom not provided'
      });
    } else if (!req.body.classe) {
      return res.status(409).json({
        success: false,
        message: 'classe not provided'
      });
    } else {
      const eleve = new Eleve({
        nom: req.body.nom.toUpperCase(),
        prenom: req.body.prenom,
        classe: req.body.classe
      });

      eleve.save(req.body, (err, eleve) => {
        if (err) return next(err);

        return res.status(200).json({
          success: true,
          message: 'eleve sauvé',
          obj: eleve
        });
      });
    }
  });

  router.delete('/eleves/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(409).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Eleve.findByIdAndRemove(req.params.id, (err, eleve) => {
        if (err) return next(err);

        if (!eleve) {
          return res.status(400).json({
            success: false,
            message: 'eleve not find'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'eleve supprimé'
        });
      });
    }
  });

  return router;
}