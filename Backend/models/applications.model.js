const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Companies',
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Jobs', 
    },
    applicants: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        status: {
          type: String,
          enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
          default: 'Applied',
          required: true,
        },
        applied_date: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Applications', applicationSchema);
