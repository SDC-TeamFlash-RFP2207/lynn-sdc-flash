const models = require('./db-mod.js');

module.exports = {
  getAll: (req, res) => {
    console.log('path conroller getAll works!');
    console.log(models.getQs(req));
    models.getQs(req.query).then((data) => {
      res.status(200).json(data.rows);
    });
  },

  getAnswers: (req, res) => {
    models.getAs(req.query).then((data) => {
      res.status(200).json(data.rows);
    });
  },


}