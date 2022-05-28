const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes');
const { NotFoundError } = require('../errors');

//get all jobs 
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy : req.user.id});
    res.status(StatusCodes.OK).json({jobs});
}

//get single job 
const getSingleJob = async (req, res) => {
    const {user :{id :userID}, params : {id}} = req;
    const job = await Job.findOne({_id: id , createdBy: userID});
    console.log(job)
    if(!job){
        console.log('a marche')
        throw new NotFoundError('No Job with the provided ID is available !')
    }
    res.status(StatusCodes.OK).json({job})
}

//create job
const createJob = async (req, res) => {
    const tempJob = {...req.body , createdBy : req.user.id};
    const job = await Job.create({...tempJob});
    res.status(StatusCodes.CREATED).json({job});
}

//update job
const updateJob = async (req, res) => {
    const {id} = req.params;
    const userID = req.user.id
    const job = await Job.findOneAndUpdate({_id: id , createdBy: userID}, {...req.body}, {
        new: true,
        runValidators: true
    });
    if(!job){
        throw new NotFoundError('No Job with the provided ID is available !')
    }
    res.status(StatusCodes.OK).json({job})
}


//delete Job
const deleteJob = async (req, res) => {
    const {id} = req.params;
    const userID = req.user.id
    const job = await Job.findOneAndDelete({_id: id , createdBy: userID});
    if(!job){
        throw new NotFoundError('No Job with the provided ID is available !')
    }
    res.status(StatusCodes.OK).json({job})
}


module.exports = {
    getAllJobs,
    updateJob,
    getSingleJob,
    deleteJob,
    createJob
}