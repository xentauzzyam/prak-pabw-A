const router = require("express").Router();

const Auth = require("../controller/authController");
const validateEmail = require("../middleware/validateEmail");
const authMe = require("../middleware/authMe");
const verifyEmailToken = require('../middleware/verifyEmailToken');

router.post("/member/register", validateEmail, Auth.register);
router.post("/member/login", Auth.login);
router.post("/forgot-password", Auth.forgotPassword);
router.post("/send-email-verified", Auth.sendEmailVerified);
router.get('/verify-email', verifyEmailToken, async (req, res, next) => {
    try {
      // Update user to set verified to true
      await req.user.update({ verified: true });
  
      res.status(200).json({
        status: 'Success',
        message: 'Email verified successfully',
      });
    } catch (err) {
      next(new apiError(err.message, 500));
    }
  });

module.exports = router;
