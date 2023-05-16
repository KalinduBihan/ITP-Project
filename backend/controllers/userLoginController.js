var userProfiles = require('../models/userProfiles.js');
var userProfileController = require('../controllers/userProfileController.js');

const userLogin = async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) {
        // throw Error('All fields must be filled')
        return res.status(400).json({ error: "All fields must be filled" })
    }

    const user = await userProfiles.findOne({ username })

    if (!user) {
        // throw Error('Incorrect Username')
        return res.status(400).json({ error: "Incorrect Username" })
    }

    if (user.password != password) {
        // throw Error("Invalid password")
        return res.status(400).json({ error: "Invalid password" })

    }
    // return user
    userProfileController.createSendToken(user, 200, res);
}

const currentUser = async (req, res, next) => {

    let data = [];
    data.push(req.user);

    res.status(200).json({
        status: "success",
        data: data,
    });
};

module.exports = {
    userLogin,
    currentUser
}