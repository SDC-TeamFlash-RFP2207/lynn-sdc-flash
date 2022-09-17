const models = require('./db-mod.js');

module.exports = {
  getAll: (req, res) => {
    console.log('path conroller getAll works!');
    models.getQs(req);
    res.sendStatus(200);
  },

}