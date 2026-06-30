const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    phone:   { type: String, trim: true, default: null },
    source:  {
      type: String,
      enum: ['google', 'instagram', 'linkedin', 'referral', 'twitter', 'other'],
      default: 'other'
    },
    service: { type: String, default: null },
    message: { type: String, required: true },
    status:  {
      type: String,
      enum: ['new', 'contacted', 'converted'],
      default: 'new'
    },
    notes: [noteSchema]
  },
  { timestamps: true }  // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model('Lead', leadSchema);
