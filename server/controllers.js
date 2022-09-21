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
    console.log('path controller postQuestion success!');
    console.log('req.params:', req.body);
    models.postQ(req.body).then((data) => {
      res.status(201).end();
    })
  },

  postAnswer: (req, res) => {
    console.log('path controller postAnswer success!');
    models.postA(req).then((data) => {
      const id = data.rows[0].a_id;
      const photos = req.body.photos;
      photos.map((url) => models.postPhotos([id, url]));
    }).then((data) => {
      res.status(201).end();
    })
  },

  putQHelpful: (req, res) => {
    models.putQHelp(req.params).then((data) => {
      res.status(204).end();
    });
  },

  putQReport: (req, res) => {
    models.putQR(req.params).then((data) => {
      res.status(204).end();
    });
  },

  putAHelpful: (req, res) => {
    models.putAHelp(req.params).then((data) => {
      res.status(204).end();
    });
  },

  putAReport: (req, res) => {
    models.putAR(req.params).then((data) => {
      res.status(204).end();
    });
  },


}