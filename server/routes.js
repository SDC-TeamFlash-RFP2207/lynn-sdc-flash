const router = require('express').Router();
const controllers = require('./controllers');

router.get('/qa/questions', controllers.getAll);
router.get('/qa/questions/:question_id/answers', controllers.getAnswers);
router.post('/qa/questions', controllers.postQuestion);
router.post('/qa/questions/:question_id/answers', controllers.postAnswer);
router.put('/qa/questions/:question_id/helpful', controllers.putQHelpful);
router.put('/qa/questions/:question_id/report', controllers.putQReport);
router.put('/qa/answers/:answer_id/helpful', controllers.putAHelpful);
router.put('/qa/answers/:answer_id/report', controllers.putAReport);



module.exports = router;
