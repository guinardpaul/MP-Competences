const mongoose = require('mongoose');
const Competence = require('../models/competences');

module.exports = (router) => {

  /**
   * Get All competences par Cycle
   */
  router.get('/competences/cycle/:cycle', (req, res, next) => {
    if (!req.params.cycle) {
      res.status(400).json({
        success: false,
        message: 'cycle id not provided'
      });
    } else {
      Competence.find({ cycle: req.params.cycle }, (err, ct) => {
        if (err) return next(err);

        if (!ct) {
          res.status(404).json({
            success: false,
            message: 'Object Competences not find'
          });
        }

        return res.status(200).json(ct);
      });
    }
  });

  /**
   * Get One competence par ref CT
   */
  router.get('/competences/ref/:ref_ct', (req, res, next) => {
    if (!req.params.ref_ct) {
      res.status(400).json({
        success: false,
        message: 'ref_ct not provided'
      });
    } else {
      Competence.find({ ref_ct: req.params.ref_ct }, (err, ct) => {
        if (err) return next(err);

        if (!ct) {
          res.status(404).json({
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
   * Get All competences par Domaine
   */
  router.get('/competences/domaine/:domaine', (req, res, next) => {
    if (!req.params.domaine) {
      res.status(400).json({
        success: false,
        message: 'domaine not provided'
      });
    } else {
      Competence.find({ domaine: req.params.domaine }).sort({ 'sous_domaine': 1, 'ref_ct': 1 }).exec((err, ct) => {
        if (err) return next(err);

        if (!ct) {
          res.status(404).json({
            success: false,
            message: 'Competences not find'
          });
        }

        return res.status(200).json(ct);
      });
    }
  });

  /**
   * Get All competences par Domaine et cycle
   */
  router.get('/competences/cycle/:cycle/domaine/:domaine', (req, res, next) => {
    if (!req.params.domaine) {
      res.status(400).json({
        success: false,
        message: 'domaine not provided'
      });
    } else if (!req.params.cycle) {
      res.status(400).json({
        success: false,
        message: 'cycle not provided'
      });
    } else {
      Competence.find({ domaine: req.params.domaine, cycle: req.params.cycle }, (err, ct) => {
        if (err) return next(err);

        if (!ct) {
          res.status(404).json({
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
   * Check unicité ref CT
   */
  router.get('/competences/cycle/:cycle/ref/:ref_ct', (req, res, next) => {
    if (!req.params.cycle) {
      res.status(400).json({
        success: false,
        message: 'Cycle not provided'
      });
    } else if (!req.params.ref_ct) {
      res.status(400).json({
        success: false,
        message: 'ref CT not provided'
      });
    } else {
      Competence.findOne({ ref_ct: req.params.ref_ct, cycle: req.params.cycle }, (err, ct) => {
        if (err) return next(err);

        if (!ct) {
          return res.status(200).json({
            success: true,
            message: 'Ref CT disponible'
          });
        }

        return res.status(200).json({
          success: false,
          message: 'Ref CT déjà utilisée par une compétence'
        });
      });
    }
  });

  /**
   * Create Competence
   */
  router.post('/competences/', (req, res, next) => {
    if (!req.body.ref_ct) {
      res.status(400).json({
        success: false,
        message: 'ref_ct not provided'
      });
    } else if (!req.body.description_ct) {
      res.status(400).json({
        success: false,
        message: 'description_ct not provided'
      });
    } else if (!req.body.cycle) {
      res.status(400).json({
        success: false,
        message: 'cycle not provided'
      });
    } else if (!req.body.domaine) {
      res.status(400).json({
        success: false,
        message: 'domaine not provided'
      });
    } else {
      Competence.create(req.body, (err, ct) => {
        if (err) return next(err);

        res.status(201).json({
          success: true,
          message: 'Object Competence saved',
          obj: ct
        });
      });
    }
  });

  /**
   * Update Competence
   */
  router.put('/competences/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else {
      Competence.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, ct) => {
        if (err) return next(err);

        if (!ct) {
          return res.status(404).json({
            success: false,
            message: 'Object Competence not find'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Object Competence updated',
          obj: ct
        });
      });
    }
  });

  /**
   * Delete Competence
   */
  router.delete('/competences/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Competence.findByIdAndRemove(req.params.id, (err, ct) => {
        if (err) return next(err);

        if (!ct) {
          return res.status(404).json({
            success: false,
            message: 'Object Competence not find'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Object Competence removed'
        });
      });
    }
  });

  /**
   * add results à competence trouvee par eleve et par ref
   */
  /*  router.put('/competences/eleve/:eleve/ref/:ref_ct', (req, res, next) => {
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
   }); */

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

  /*  router.get('/competences/eleve/:eleve/ref/:ref_ct/result/:_id', (req, res, next) => {
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
   }); */

  return router;
}