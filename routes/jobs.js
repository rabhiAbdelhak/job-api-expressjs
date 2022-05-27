const {
  getAllJobs,
  updateJob,
  getSingleJob,
  deleteJob,
  createJob,
} = require("../controllers/jobs");

const router = require('express').Router();


router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob);


module.exports = router