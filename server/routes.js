const router = require('express').Router();
const controllers = require('./controllers');

router.get('/qa/questions', controllers.getAll);



module.exports = router;
