const router = require('express').Router();
const controllers = require('./controllers');

router.get('/qa', controllers.getAll);

module.exports = router;
