const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const InvoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    mobile: {
      type: String,
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      lowercase: true,
      trim: true,
    },
    designation: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      lowercase: true,
      trim: true,
    },
    website: {
      type: String,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    social: {
      youtube: String,
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String,
    },
  },
  { collection: 'contacts' }
);

InvoiceSchema.plugin(timestamps);
module.exports = mongoose.model('Contact', InvoiceSchema);
