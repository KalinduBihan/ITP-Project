const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userRolesSchema = new Schema({
    roleName:{type:String,required : true,unique: true},
    UserInformation:{type:Boolean,required : true},
    Attendance:{type:Boolean,required : true},
    Leave:{type:Boolean,required : true },
    WOH:{type:Boolean,required : true},
    Goals:{type:Boolean,required : true},
    Appraisal:{type:Boolean,required : true },
    Training:{type:Boolean,required : true },
    Calendar:{type:Boolean,required : true },
    viewUserInformation:{type:Boolean,required : true },
    viewAttendance:{type:Boolean,required : true },
    viewLeave:{type:Boolean,required : true },
    viewWOH :{type:Boolean,required : true },
    viewGoals:{type:Boolean,required : true },
    viewAppraisal:{type:Boolean,required : true },
    viewTraining:{type:Boolean,required : true },
    viewCalendar:{type:Boolean,required : true },
    alterUserInformation:{type:Boolean,required : true },
    alterAttendance:{type:Boolean,required : true },
    alterLeave:{type:Boolean,required : true },
    alterWOH :{type:Boolean,required : true },
    alterGoals:{type:Boolean,required : true },
    alterAppraisal:{type:Boolean,required : true },
    alterTraining:{type:Boolean,required : true },
    alterCalendar:{type:Boolean,required : true },
})

module.exports = mongoose.model('userRoles',userRolesSchema)
