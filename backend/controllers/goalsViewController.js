const goalsTable = require('../models/goalsTable')
var userProfiles = require('../models/userProfiles.js');
const mongoose = require('mongoose');
const goalsAssigned = require('../models/goalsAssigned');

//get a single goal

const getGoalDetails = async (req, res) => {
    const {id } = req.params

    
    const goals = await goalsAssigned.find({ Employee: id })

    if (!goals) {
        return res.status(404).json({
            error: 'no such goal'
        })
    }

    res.status(200).json(goals)
}



module.exports = {
   getGoalDetails
}



  
 
  
  
  
  
  
  
  
