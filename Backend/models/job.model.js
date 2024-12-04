const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Companies', 
    },
    job_id: {
      type: String,
    },
    job_title: {
      type: String,
      required: true,
      trim: true, 
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number, 
      default: 0, 
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    skill: {
      type: [String],
      default: [],
    },
    post_no: {
      type: Number,
      required: true, 
      min: 1,
    },
    posted_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    last_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

JobApplicationSchema.pre('save', function (next) {
  this.job_id = this._id;
  next();
});

module.exports = mongoose.model('Jobs', JobApplicationSchema);
