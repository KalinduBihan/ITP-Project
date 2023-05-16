const mongoose = require('mongoose')
const appraisalProcessModel = require('../models/appraisalProcess')
const appraisalResultModel = require('../models/appraisalResult')
const _ = require('lodash')

const createAppraisalProcess = async (req, res) => {
    const { selectedAppraisers, processName, processedBy, dueDate, rows, appraisee } = req.body

    try {
        const appraisers = selectedAppraisers.map(appraiser => ({ user: new mongoose.Types.ObjectId(appraiser.value) }))
        const formRows = rows.map(row => new mongoose.Types.ObjectId(row.id))

        await appraisalProcessModel.create({
            processName: processName,
            processBy: processedBy,
            appraisee: appraisee.label,
            appraiseeId: appraisee.value,
            dueDate: dueDate,
            appraisers: appraisers,
            rows: formRows
        })

        res.status(200).json({
            message: 'Appraisal process created successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating appraisal process',
            error: error.message
        })
    }
}

const getAppraisalRequestForUser = async (req, res) => {
    const loggedInUserId = req.user._id;

    try {
        const requests = await appraisalProcessModel.find({ "appraisers.user": loggedInUserId }).exec();

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({
            message: 'Error getting appraisal requests',
            error: error.message
        });
    }
}

const getAllAppraisalRequests = async (req, res) => {
    const requests = await appraisalProcessModel.find({}).sort({ createdAt: -1 })

    res.status(200).json(requests)
}

const getSingleAppraisalRequest = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal process' })
    }

    const appraisalProcess = await appraisalProcessModel.findById(id)

    if (!appraisalProcess) {
        return res.status(400).json({ error: 'No such appraisal process' })
    }

    res.status(200).json(appraisalProcess)
}

const updateAppraisalProcess = async (req, res) => {
    const { id } = req.params
    const { dueDate, selectedAppraisers } = req.body

    const appraisers = selectedAppraisers.map(appraiser => ({ user: new mongoose.Types.ObjectId(appraiser.value) }))

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal process' })
    }

    const appraisalProcess = await appraisalProcessModel.findOneAndUpdate({ _id: id }, {
        $set: {
            dueDate: dueDate,
            appraisers: appraisers
        }
    })

    if (!appraisalProcess) {
        return res.status(400).json({ error: 'Appraisal Process Not Updated' })
    }

    res.status(200).json(appraisalProcess)
}

const closeAppraisalProcess = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal process' })
    }

    const appraisalProcess = await appraisalProcessModel.findOneAndUpdate({ _id: id }, {
        $set: {
            status: "closed"
        }
    })

    res.status(200).json(appraisalProcess)
}

const deleteAppraisalProcess = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal process' })
    }

    const appraisalProcess = await appraisalProcessModel.findOneAndDelete({ _id: id })

    if (!appraisalProcess) {
        return res.status(400).json({ error: 'No such appraisal process' })
    }


    res.status(200).json(appraisalProcess)

}

const acceptAppraisalRequest = async (req, res) => {
    // const { id } = req.params
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal process' })
    }

    const appraisalProcess = await appraisalProcessModel.updateOne(
        // filter to find the document to update
        { _id: id, "appraisers.user": req.user._id },
        // update the status field in the appraisers array
        { $set: { "appraisers.$.status": 'Accepted' } },
    );

    if (!appraisalProcess) {
        return res.status(400).json({ error: 'Appraisal Process Not Updated' })
    }

    res.status(200).json(appraisalProcess)
}

const declineAppraisalRequest = async (req, res) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such appraisal process' })
    }

    const appraisalProcess = await appraisalProcessModel.updateOne(
        // filter to find the document to update
        { _id: id, "appraisers.user": req.user._id },
        // update the status field in the appraisers array
        { $set: { "appraisers.$.status": 'Declined' } },
    );

    if (!appraisalProcess) {
        return res.status(400).json({ error: 'Appraisal Process Not Updated' })
    }

    res.status(200).json(appraisalProcess)
}

const markAppraisal = async (req, res) => {
    const { rows, id, appraiseeId } = req.body

    try {
        const total = _.sumBy(rows, function (o) { return o.value })
        const result = rows.map(row => ({ name: row.name, marks: row.value }))

        console.log(total)

        await appraisalResultModel.create({
            appraiseeId: appraiseeId,
            appraiserName: req.user.name,
            total: total,
            processId: id,
            result: result,
        })

        await appraisalProcessModel.updateOne(
            // filter to find the document to update
            { _id: id, "appraisers.user": req.user._id },
            // update the status field in the appraisers array
            { $set: { "appraisers.$.status": 'Marked' } },
        );

        const appraisalProcess = await appraisalProcessModel.findById(id)

        // check if all appraisers have marked the appraisal
        const allMarked = appraisalProcess.appraisers.every(appraiser => {
            return appraiser.status === 'Marked' || appraiser.status === 'Accepted'
        })

        // if all appraisers have marked, update the status to 'Marked'
        if (allMarked) {
            await appraisalProcessModel.updateOne(
                { _id: id },
                { $set: { status: 'Completed' } }
            )
        }

        res.status(200).json({
            message: 'Appraisal process marked successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error creating appraisal process',
            error: error.message
        })
    }
}

const getMyAppraisals = async (req, res) => {
    const loggedInUserId = req.user._id;

    try {
        const requests = await appraisalResultModel
            .find({ "appraiseeId": loggedInUserId })
            .populate('processId')
            .exec();

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({
            message: 'Error getting appraisal requests',
            error: error.message
        });
    }
}


module.exports = {
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
}