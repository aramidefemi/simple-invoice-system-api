const Invoice = require('../entities/invoice');

exports.all = async (req, res) => {
  const { _id: user } = req.user;
  const { limit, page } = req.query;
  const skip = parseInt(limit) * parseInt(page);
  try {
    const invoices = await Invoice.find({user})
      .populate('user', 'name username email')
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 30);

    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
exports.get = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findById(id).populate(
      'user',
      'name username email'
    );
    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
exports.getPaymentStats = async (req, res) => {
  const { _id: user } = req.user;
  try {
    const result = await Promise.all([
      Invoice.find({ user, status: 'paid' }).count(),
      Invoice.find({ user, status: 'pending' }).count(),
      Invoice.find({ user, status: 'unpaid' }).count(),
    ]);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
exports.create = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  try {
    body.user = _id;
    const invoice = new Invoice(body);
    await invoice.save();

    reminderAfter24hr(invoice);

    return res.status(200).json({ success: true, invoice: invoice._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
};
exports.recordPayment = async (req, res) => {
  const { _id } = req.body.invoice;

  try {
    const thisInvoice = await Invoice.findById(_id);
    thisInvoice.status = 'paid';
    await thisInvoice.save();

    return res.status(200).json({ success: true, invoice: invoice._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
};

const reminderAfter24hr = async (invoice) => {
  try {
    const { email, company, phone, _id } = invoice;

    setTimeout(() => {
      console.log('Hi please Pay your invoice');
    }, 4000);

    setTimeout(async () => {
      console.log('Hi your invoice has expired');

      const thisInvoice = await Invoice.findById(_id);
      thisInvoice.status = 'unpaid';
      await thisInvoice.save();
    }, 8000);
  } catch (error) {
    console.error(error);
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await Invoice.findById(id).updateOne(body);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Invoice.findById(id).deleteOne();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
