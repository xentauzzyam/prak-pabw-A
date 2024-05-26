const jwt = require('jsonwebtoken');
const { Auth } = require('../models');
const apiError = require('../../utils/apiError');

const verifyEmailToken = async (req, res, next) => {
  try {
    const token = req.query.token;

    if (!token) {
      return next(new apiError('Token is required', 400));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded);
    } catch (err) {
      return next(new apiError('Invalid or expired token', 400));
    }

    const user = await Auth.findOne({
      where: {
        email: decoded.email,
        token: token,
      },
    });

    if (!user) {
      return next(new apiError('User not found', 404));
    }

    if (user.verified) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Email already verified',
      });
    }

    req.user = user;

    next();
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

module.exports = verifyEmailToken;
