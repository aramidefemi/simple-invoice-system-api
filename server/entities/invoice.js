const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const InvoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
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
    },
    status: {
      type: String,
      default: 'pending',
    }
  },
);

InvoiceSchema.plugin(timestamps);
module.exports = mongoose.model('Invoice', InvoiceSchema);
