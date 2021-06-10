const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const InvoiceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      lowercase: true,
      trim: true,
    },
    amount: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    }
  },
);

InvoiceSchema.plugin(timestamps);
module.exports = mongoose.model('Invoice', InvoiceSchema);
