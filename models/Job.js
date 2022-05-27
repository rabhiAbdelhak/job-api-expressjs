const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please ! provide the comapany name "],
      maxlength: [30, 'the comany name must be less then 30 caracter']
    },
    position: {
      type: String,
      required: [true, "Please ! provide the posiiton name "],
    },
    status: {
      type: String,
      required: [true, "Please ! provide the status"],
      enum : ['pending', 'interview', 'declined' ],
      default: 'pending'
    },
    jobType: {
      type: String,
      required: [true, "Please ! provide the job type"],
      enum : ['full-time', 'part-time', 'remote', 'internship'],
      default: 'full-time'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required : [true, 'please provide the user']
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
