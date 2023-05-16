var userProfileController = require('../controllers/userProfileController.js');
var express = require('express');

const router = express.Router();

router.route('/userProfile/create').post(userProfileController.createUserProfileControllerFn);

router.route('/userProfile/getAll').get(userProfileController.getAllUserProfileControllerFn);

router.route('/userProfile/update/:id').patch(userProfileController.updateUserProfileController);

router.route('/userProfile/remove/:id').delete(userProfileController.deleteUserProfileController);

router.route('/userProfile/id/:id').get(userProfileController.getUserProfileById);

router.route('/userProfile/search/:key').get(userProfileController.searchUserProfile);

router.route('/userProfile/image').post(userProfileController.setProfilePicture);

module.exports = router;
