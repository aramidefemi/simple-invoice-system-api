const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../config');

exports.validateToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token> 

    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, JWT_PRIVATE_KEY);

      req.user = result._doc || result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (error) {
      // Throw an error just in case anything goes wrong with verification
      return res.status(500).json({ error: `${error}` });
    }
  } else {
    return res
      .status(500)
      .json({ error: `Authentication error. Token required.` });
  }
};
