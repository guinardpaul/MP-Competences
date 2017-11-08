const mongoose = require('mongoose');
const Competence = require('../models/competences');

module.exports = (router) => {

  /**
   * Get All competences par eleve
   */
  router.get('/competences/eleve/:eleve', (req, res, next) => {
    if (!req.params.eleve) {
      res.status(409).json({
        success: false,
        message: 'eleve id not provided'
      });
    } else {
      Competence.find({ eleve: req.params.eleve }, (err, ct) => {
        if (err) return next(err);
        /* if (!ct) {
          res.status(400).json({
            success: false,
            message: 'Competences not find'
          });
        } */
        return res.status(200).json({
          success: true,
          obj: ct
        });
      });
    }
  });

  /**
   * Get All competences par eleve et par ref CT
   */
  router.get('/competences/eleve/:eleve/ref/:ref_ct', (req, res, next) => {
    if (!req.params.eleve) {
      res.status(409).json({
        success: false,
        message: 'eleve id not provided'
      });
    } else if (!req.params.ref_ct) {
      res.status(409).json({
        success: false,
        message: 'ref_ct not provided'
      });
    } else {
      Competence.find({ eleve: req.params.eleve, ref_ct: req.params.ref_ct }, (err, ct) => {
        if (err) return next(err);
        if (!ct) {
          res.status(400).json({
            success: false,
            message: 'Competences not find'
          });
        }
        return res.status(200).json({
          success: true,
          obj: ct
        });
      });
    }
  });

  router.post('/competences/', (req, res, next) => {
    if (!req.body) {
      res.status(409).json({
        success: false,
        message: 'body not provided'
      });
    } else {
      Competence.create(req.body, (err, ct) => {
        if (err) return next(err);

        res.status(200).json({
          success: true,
          obj: ct
        });
      });
    }
  });

  /**
   * add results à competence trouvee par eleve et par ref
   */
  router.put('/competences/eleve/:eleve/ref/:ref_ct', (req, res, next) => {
    if (!req.params.eleve) {
      res.status(409).json({
        success: false,
        message: 'eleve id not provided'
      });
    } else if (!req.params.ref_ct) {
      res.status(409).json({
        success: false,
        message: 'ref_ct not provided'
      });
    } else {
      Competence.findOneAndUpdate({ eleve: req.params.eleve, ref_ct: req.params.ref_ct },
        { $push: { resultats: { resultat: req.body.resultat, value: req.body.value } } }, { new: true }, (err, ct) => {
          if (err) return next(err);
          if (!ct) {
            res.status(400).json({
              success: false,
              message: 'Competences not find'
            });
          }
          return res.status(200).json({
            success: true,
            obj: ct
          });
        });
    }
  });

  /**
   * update results par id à competence trouvee par eleve et par ref
   */
  /* router.put('/competences/eleve/:eleve/ref/:ref_ct/result/:id', (req, res, next) => {
    if (!req.params.eleve) {
      res.status(409).json({
        success: false,
        message: 'eleve id not provided'
      });
    } else if (!req.params.ref_ct) {
      res.status(409).json({
        success: false,
        message: 'ref_ct not provided'
      });
    } else if (!req.params.id) {
      res.status(409).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Competence.findOneAndUpdate({ eleve: req.params.eleve, ref_ct: req.params.ref_ct },
        { resultats: {$eq:{_id: req.params.id}} {  resultat: req.body.resultat, value: req.body.value } }, { new: true }, (err, ct) => {
          if (err) return next(err);
          if (!ct) {
            res.status(400).json({
              success: false,
              message: 'Competences not find'
            });
          }
          return res.status(200).json({
            success: true,
            obj: ct
          });
        });
    }
  }); */

  router.get('/competences/eleve/:eleve/ref/:ref_ct/result/:_id', (req, res, next) => {
    Competence.findOne({ eleve: req.params.eleve, ref_ct: req.params.ref_ct, resultats: { _id: req.params._id } }, (err, ct) => {
      if (err) return next(err);
      if (!ct) {
        res.json({
          success: false,
          message: 'result not found'
        });
      }

      res.status(200).json({
        success: false,
        obj: ct
      });
    });
  });

  return router;
}