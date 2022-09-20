const models = require('./db-mod.js');

module.exports = {
  getAll: (req, res) => {
    console.log('path controller getAll works!');
    models.getQs(req.query).then((data) => {
      res.status(200).json(data.rows);
    });
  },

  getAnswers: (req, res) => {
    console.log('path controller getAnswers works!');
    console.log('req.query:', req.params);
    models.getAs(req.params).then((data) => {
      res.status(200).json(data.rows);
    });
  },

  postQuestion: (req, res) => {
    models.postQ(req.query).then((data) => {
      res.status(201);
    })
  },

  postAnswer: (req, res) => {
    models.postA(req.query).then((data) => {
      res.status(201);
    })
  },

  putQHelpful: (req, res) => {
    models.putQHelp(req.query).then((data) => {
      res.status(204);
    });
  },

  putQReport: (req, res) => {
    models.putQR(req.query).then((data) => {
      res.status(204);
    });
  },

  putAHelpful: (req, res) => {
    models.putAHelp(req.query).then((data) => {
      res.status(204);
    });
  },

  putAReport: (req, res) => {
    models.putAR(req.query).then((data) => {
      res.status(204);
    });
  },


}