const User = require('../entities/user');
const jwt = require('jsonwebtoken');
const { JWT_PRIVATE_KEY } = require('../config');
const privateKey = JWT_PRIVATE_KEY;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error('Invalid Parameters');
    const user = await User.findOne({ email });

    console.log('user',user)
    if (!user) throw new Error('Account not found!');

    const token = jwt.sign({ ...user }, privateKey);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error.message });
  }
};

exports.signup = async (req, res) => {
  const { body } = req;

  try {
    if (!body.email || !body.password)
      throw new Error('Invalid Parameters');

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) throw new Error('Email address already in use');

    const user = new User(body);
    user.save();

    const token = jwt.sign({ ...user }, privateKey);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const passwordReset = Math.floor(Math.random() * 100000000).toString();
    const user = await User.findOne({ email });

    if (!user) throw new Error('Account not found!');

    user.updateOne({ password: passwordReset });

    // implement email notifying user of password reset

    return res
      .status(200)
      .json({ success: true, message: 'Your password has been reset' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error.message });
  }
};
