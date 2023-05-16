const { Router } = require('express')
const {
    createAppraisalQuestion,
    getAppraisalQuestion,
    getAppraisalQuestions,
    deleteAppraisalQuestion,
    updateAppraisalQuestion
} = require('../controllers/appraisalQuestionsController')


const router = Router()

//create and get all appraisal questions
router.route('/appraisalquestions')
    .get(getAppraisalQuestions)
    .post(createAppraisalQuestion)

//get,delete and update single appraisal question
router.route('/appraisalquestions/:id')
    .get(getAppraisalQuestion)
    .delete(deleteAppraisalQuestion)
    .patch(updateAppraisalQuestion)

module.exports = router
