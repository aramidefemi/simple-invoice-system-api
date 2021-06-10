const Invoice = require('../entities/invoice');

exports.all = async (req, res) => {
  const { limit, page } = req.query;
  const skip = parseInt(limit) * parseInt(page);
  try {
    const invoices = await Invoice.find()
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
exports.create = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  try {
    body.user = _id;
    const invoice = new Invoice(body); 
    invoice.save();

    return res.status(200).json({ success: true, invoice: invoice._id  });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ err: error});
  }
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await Invoice.findById(id).updateOne(body);

    return res.status(200).json({ success: true, });
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

