const mongoose = require('mongoose');
const Classe = require('../models/classes');

module.exports = (router) => {

  /**
   * Get All Classes
   */
  router.get('/classes', (req, res, next) => {
    Classe.find((err, classes) => {
      if (err) return next(err);

      if (!classes) {
        return res.status(404).json({
          success: false,
          message: 'Object Classe not find'
        });
      }
      return res.status(200).json(classes);
    });
  });

  /**
   * Get One Classe by Id
   */
  router.get('/classes/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Classe.findById(req.params.id, (err, classe) => {
        if (err) return next(err);

        if (!classe) {
          return res.status(404).json({
            success: false,
            message: 'Object Classe not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: classe
        });
      });
    }
  });

  router.get('/classes/nom/:nom_classe', (req, res, next) => {
    if (!req.params.nom_classe) {
      res.status(400).json({
        success: false,
        message: 'nom_classe not provided'
      });
    } else {
      Classe.findOne({ nom_classe: req.params.nom_classe }, (err, classe) => {
        if (err) return next(err);

        if (!classe) {
          return res.status(404).json({
            success: false,
            message: 'Object Classe not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: classe
        });
      });
    }
  });

  /**
   * Save Classe
   */
  router.post('/classes', (req, res, next) => {
    if (!req.body.nom_classe) {
      return res.status(400).json({
        success: false,
        message: 'nom classe not provided'
      });
    } else if (!req.body.cycle) {
      return res.status(400).json({
        success: false,
        message: 'cycle not provided'
      });
    } else {
      Classe.create(req.body, (err, classe) => {
        if (err) {
          if (err.code === 11000) {
            return res.status(409).json({
              success: false,
              message: 'nom classe already exist'
            });
          } else {
            return next(err);
          }
        }

        return res.status(201).json({
          success: true,
          message: 'Object Classe saved',
          obj: classe
        });
      });
    }
  });

  /**
   * Update Classe
   */
  router.put('/classes/:id', (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Classe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, classe) => {
        if (err) return next(err);

        if (!classe) {
          return res.status(404).json({
            success: false,
            message: 'Object Classe not find'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Object Classe updated',
          obj: classe
        });
      });
    }
  });

  /**
   * Delete Classe
   */
  router.delete('/classes/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Classe.findByIdAndRemove(req.params.id, (err, classe) => {
        if (err) return next(err);

        if (!classe) {
          return res.status(404).json({
            success: false,
            message: 'Object Classe not find'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Object Classe removed'
        });
      });
    }
  });

  return router;
}