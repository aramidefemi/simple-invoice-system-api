const Invoice = require('../controllers/invoice')
const { validateToken } = require('../middlewares/auth');
/**
 *
 *
 */
module.exports = (app) => {
  app.route('/invoice/all').get(validateToken, Invoice.all);
  /**
   * Create the remaining routes
   * get,
   * create,
   * delete,
   * update,
   * remove
   */

  app.route('/invoice/:id').get(validateToken, Invoice.get);
  app.route('/invoice').post(validateToken, Invoice.create); 
  app.route('/invoice/:id').put(validateToken, Invoice.update);
  app.route('/invoice/:id').delete(validateToken, Invoice.remove);


  app.route('/invoice/payment/stats').get(validateToken, Invoice.getPaymentStats);

  app.route('/invoice/record/payment').post(validateToken, Invoice.recordPayment);
};
