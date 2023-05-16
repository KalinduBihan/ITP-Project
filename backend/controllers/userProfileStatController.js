const userTable = require('../models/userProfiles')

const mongoose = require('mongoose');

const profileByGender  = async (req, res) => {
    try {
    const profilesByGender = await userTable.aggregate([
      {
        $group: {
          _id: '$gender',
          totalProfiles: { $sum: 1 }
         
        },
      },
    ]);
    res.send(profilesByGender);
}catch(error){
    console.error(error.message);
    res.status(500).send('Server Error');}
  
};

const profileByRole  = async (req, res) => {
    try {
    const profilesByRole = await userTable.aggregate([
      {
        $group: {
          _id: '$userRole',
          totalProfiles: { $sum: 1 }
         
        },
      },
    ]);
    res.send(profilesByRole);
}catch(error){
    console.error(error.message);
    res.status(500).send('Server Error');}
  
};

module.exports = {
    profileByGender,
    profileByRole
}

