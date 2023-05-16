const goalsTable = require('../models/goalsTable')
var userProfiles = require('../models/userProfiles.js');
const goalAssign = require('../models/goalsAssigned')

const mongoose = require('mongoose');
const goalsAssigned = require('../models/goalsAssigned');


//get number of goals in each type

const goalByCategory  = async (req, res) => {
    try {
    const goalsByCategory = await goalsTable.aggregate([
      {
        $group: {
          _id: '$goalCategory',
          totalGoals: { $sum: 1 }
         
        },
      },
    ]);
    res.send(goalsByCategory);
}catch(error){
    console.error(error.message);
    res.status(500).send('Server Error');}
  
};

const goalByStatus  = async (req, res) => {
    try {
    const goalsByStatus = await goalsAssigned.aggregate([
      {
        $group: {
          _id: '$status',
          totalGoals: { $sum: 1 }
         
        },
      },
    ]);
    res.send(goalsByStatus);
}catch(error){
    console.error(error.message);
    res.status(500).send('Server Error');}
  
};



module.exports = {
    goalByCategory,
    goalByStatus
}



  
 
  
  
  
  
  
  
  
