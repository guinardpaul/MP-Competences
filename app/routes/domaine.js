const mongoose = require('mongoose');
const Domaine = require('../models/domaines');

module.exports = (router) => {

  /**
   * Get All Domaines
   */
  router.get('/domaines', (req, res, next) => {
    Domaine.find((err, data) => {
      if (err) return next(err);

      return res.status(200).json(data);
    });
  });

  /**
   * Get All Domaine by cycle
   */
  router.get('/domaines/cycle/:cycle', (req, res, next) => {
    if (!req.params.cycle) {
      res.status(400).json({
        success: false,
        message: 'cycle not provided'
      });
    } else {
      Domaine.find({ cycle: req.params.cycle }).sort('ref_domaine').exec((err, domaine) => {
        if (err) return next(err);

        if (!domaine) {
          return res.status(404).json({
            success: false,
            message: 'Domaines not find'
          });
        }

        return res.status(200).json(domaine);
      });
    }
  });

  /**
   * Get One Domaine by id
   */
  router.get('/domaines/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Domaine.findById(req.params.id, (err, data) => {
        if (err) return next(err);

        if (!data) {
          return res.status(404).json({
            success: false,
            message: 'Domaine not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: data
        });
      });
    }
  });

  /**
   * Check ref unicité
   */
  router.get('/domaines/cycle/:cycle/ref/:ref_domaine', (req, res, next) => {
    if (!req.params.cycle) {
      res.status(400).json({
        success: false,
        message: 'cycle not provided'
      });
    } else if (!req.params.ref_domaine) {
      res.status(400).json({
        success: false,
        message: 'ref domaine not provided'
      });
    } else {
      Domaine.findOne({ cycle: req.params.cycle, ref_domaine: req.params.ref_domaine }, (err, domaine) => {
        if (err) return next(err);

        if (!domaine) {
          return res.status(200).json({
            success: true,
            message: 'ref disponible'
          });
        }

        return res.status(200).json({
          success: false,
          message: 'ref déja utilisée'
        });
      });
    }
  });

  /**
   * Create Domaine
   */
  router.post('/domaines', (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else {
      Domaine.create(req.body, (err, data) => {
        if (err) return next(err);

        return res.status(200).json({
          success: true,
          message: 'Domaine créé',
          obj: data
        });
      });
    }
  });

  /**
   * Update Domaine
   */
  router.put('/domaines/:id', (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Domaine.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        if (err) return next(err);

        if (!data) {
          return res.status(404).json({
            success: false,
            message: 'Domaine not find'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Domaine modifié',
          obj: data
        });
      });
    }
  });

  /**
   * Delete Domaine
   */
  router.delete('/domaines/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Domaine.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return next(err);

        if (!data) {
          return res.status(404).json({
            success: false,
            message: 'Domaine not find'
          });
        }

        return res.status(200).json({
          success: false,
          message: 'Domaine supprimé'
        });
      });
    }
  });

  return router;
}