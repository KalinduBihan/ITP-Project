const workOnHoliday = require("../models/workOnHolidayRecords")
const mongoose = require("mongoose")

//get all workOnHoliday records
const getAllWorkOnHolidayRecords = async(req,res)=>{
    const workOnHolidayRecords = await workOnHoliday.find({}).sort({"createdAt":-1})
    res.status(200).json(workOnHolidayRecords)
}
//get all workOnHoliday records to be approved
const getAllWorkOnHolidayRecordsApproval = async(req,res)=>{
    const workOnHolidayRecords = await workOnHoliday.find({status:"Pending"}).sort({"createdAt":-1})
    res.status(200).json(workOnHolidayRecords)
}
//get single workOnHoliday record
const getWorkOnHolidayRecord = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such record" })
    }

    const record = await workOnHoliday.findById(id)

    if (!record) {
        return res.status(404).json({ error: "No such record" })
    }
    res.status(200).json(record)
}
//create workOnHoliday request
const createWorkOnHolidayRequest = async(req,res)=>{
    
    const {userName, selectedDate, comment} = req.body

    const {userId} = req.params
    
    const recordDate = new Date()
    const recordDatelocal = recordDate.toLocaleDateString('en-GB')

    console.log(selectedDate);
    try {
        const workOnHolidayRecord = await workOnHoliday.create({
            userId:userId,
            userName:userName,
            recordDate:recordDatelocal,
            requestedDate:selectedDate,
            comment:comment
        })
        res.status(200).json(workOnHolidayRecord)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
//get workOnHoliday records of single user
const getUserAllWorkOnHolidayRecords = async(req,res)=>{
    const {userId} = req.params
    const userworkOnHolidayRecords = await workOnHoliday.find({userId:userId}).sort({"createdAt":-1})
    res.status(200).json(userworkOnHolidayRecords)
}
//delete single workOnHoliday record
const deleteWorkOnHolidayRecord = async(req,res)=>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such record" })
    }
    const record = await workOnHoliday.findOneAndDelete({_id:id})
    if (!record) {
        return res.status(404).json({ error: "No such record" })
    }
    res.status(200).json(record)
}
//update workOnHoliday record
const updateWorkOnHolidayRecord = async(req,res)=>{
    const{id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such record" })
    }
    const record = await workOnHoliday.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if (!record) {
        return res.status(404).json({ error: "No such record" })
    }
    res.status(200).json(record)

}


module.exports = {
    getAllWorkOnHolidayRecords,
    getWorkOnHolidayRecord,
    createWorkOnHolidayRequest,
    getUserAllWorkOnHolidayRecords,
    deleteWorkOnHolidayRecord,
    updateWorkOnHolidayRecord,
    getAllWorkOnHolidayRecordsApproval
}