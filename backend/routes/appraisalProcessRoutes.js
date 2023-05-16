const { Router } = require('express')
const {
    createAppraisalProcess,
    getAppraisalRequestForUser,
    getAllAppraisalRequests,
    getSingleAppraisalRequest,
    updateAppraisalProcess,
    closeAppraisalProcess,
    deleteAppraisalProcess,
    acceptAppraisalRequest,
    declineAppraisalRequest,
    markAppraisal,
    getMyAppraisals
} = require('../controllers/appraisalProcessController')
var { protect } = require('../controllers/userProfileController.js');


const router = Router()

//create and get all appraisal questions
router.route('/appraisalprocess')
    .post(protect, createAppraisalProcess)

router.route('/markappraisal')
    .post(protect, markAppraisal)

router.route('/appraisalprocess/:id')
    .get(protect, getSingleAppraisalRequest)
    .patch(protect, updateAppraisalProcess)
    .delete(protect, deleteAppraisalProcess)

router.route('/closeprocess/:id')
    .patch(protect, closeAppraisalProcess)

router.route('/accept')
    .patch(protect, acceptAppraisalRequest)

router.route('/decline')
    .patch(protect, declineAppraisalRequest)

router.route('/appraisalrequest').get(protect, getAppraisalRequestForUser)

router.route('/myappraisals').get(protect, getMyAppraisals)

router.route('/appraisalrequest/all').get(protect, getAllAppraisalRequests)

module.exports = router
