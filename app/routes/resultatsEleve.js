const Resultat = require('../models/resultatsEleve');

module.exports = (router) => {

  /**
   * get all resultats by competence id
   */
  router.get('/resultats/competence/:competence', (req, res, next) => {
    if (!req.params.competence) {
      return res.status(400).json({
        success: false,
        message: 'Competence id not provided'
      });
    } else {
      Resultat.find({ competence: req.params.competence }, (err, resultat) => {
        if (err) return next(err);

        if (!resultat) {
          return res.status(404).json({
            success: false,
            message: 'Object resultat not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: resultat
        });
      });
    }
  });

  /**
   * get all resultats by eleve id
   */
  router.get('/resultats/eleve/:eleve', (req, res, next) => {
    if (!req.params.eleve) {
      return res.status(400).json({
        success: false,
        message: 'eleve id not provided'
      });
    } else {
      Resultat.find({ eleve: req.params.eleve }, (err, resultat) => {
        if (err) return next(err);

        if (!resultat) {
          return res.status(404).json({
            success: false,
            message: 'Object resultat not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: resultat
        });
      });
    }
  });

  /**
   * get all resultats by eleve id & competence id
   */
  router.get('/resultats/eleve/:eleve/competence/:competence', (req, res, next) => {
    if (!req.params.eleve) {
      return res.status(400).json({
        success: false,
        message: 'eleve id not provided'
      });
    } else if (req.params.competence) {
      return res.status(400).json({
        success: false,
        message: 'competence id not provided'
      });
    } else {
      Resultat.find({ eleve: req.params.eleve, competence: req.params.competence }, (err, resultat) => {
        if (err) return next(err);

        if (!resultat) {
          return res.status(404).json({
            success: false,
            message: 'Object resultat not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: resultat
        });
      });
    }
  });

  /**
   * get all resultats by eleve id & competence id & trimestre
   */
  router.get('/resultats/eleve/:eleve/competence/:competence/trimestre/:trimestre', (req, res, next) => {
    if (!req.params.eleve) {
      return res.status(400).json({
        success: false,
        message: 'eleve id not provided'
      });
    } else if (req.params.competence) {
      return res.status(400).json({
        success: false,
        message: 'competence id not provided'
      });
    } else if (req.params.trimestre) {
      return res.status(400).json({
        success: false,
        message: 'trimestre id not provided'
      });
    } else {
      Resultat.find({
        eleve: req.params.eleve,
        competence: req.params.competence,
        trimestre: req.params.trimestre
      }, (err, resultat) => {
        if (err) return next(err);

        if (!resultat) {
          return res.status(404).json({
            success: false,
            message: 'Object resultat not find'
          });
        }

        return res.status(200).json({
          success: true,
          obj: resultat
        });
      });
    }
  });

  router.post('/resultats', (req, res, next) => {
    if (!req.body.competence) {
      return res.status(400).json({
        success: false,
        message: 'competence id not provided'
      });
    } else if (!req.body.eleve) {
      return res.status(400).json({
        success: false,
        message: 'eleve id not provided'
      });
    } else if (!req.body.resultats.result) {
      return res.status(400).json({
        success: false,
        message: 'result id not provided'
      });
    } else if (!req.body.resultats.value) {
      return res.status(400).json({
        success: false,
        message: 'value id not provided'
      });
    } else if (!req.body.trimestre) {
      return res.status(400).json({
        success: false,
        message: 'trimestre not provided'
      });
    } else {
      Resultat.create(req.body, (err, resultat) => {
        if (err) return next(err);

        return res.status(201).json({
          success: true,
          message: 'Object resultat saved',
          obj: resultat
        });
      });
    }
  });

  router.put('/resultats/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Resultat.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, resultat) => {
        if (err) return next(err);

        if (!resultat) {
          return res.status(404).json({
            success: false,
            message: 'Object Resultat not find'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Object Resultat updated',
          obj: resultat
        });
      });
    }
  });

  router.delete('/resultats/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Resultat.findByIdAndRemove(req.params.id, (err, resultat) => {
        if (err) return next(err);

        if (!resultat) {
          return res.status(404).json({
            success: false,
            message: 'Object Resultat not find'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Object Resultat removed',
        });
      });
    }
  });

  return router;

}