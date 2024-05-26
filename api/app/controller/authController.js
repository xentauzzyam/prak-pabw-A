const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth, User } = require("../models");
const { AUTH_EMAIL } = process.env;

const apiError = require("../../utils/apiError");
const sendEmail = require("../../utils/sendEmail");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists in the database
    const userExist = await Auth.findOne({
      where: { email }
    });

    if (userExist) {
      return next(new apiError("User email already taken", 400));
    }

    // Validate password length and characters
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const invalidLength = password.length < 8 || symbolRegex.test(password);
    if (invalidLength) {
      return next(
        new apiError(
          "Password must be at least 8 characters and contain no special characters",
          400
        )
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Create a new user with email and hashed password
    const newUser = await Auth.create({
      email,
      password: hashedPassword,
      verified: false, // Set verified to false initially
    });

    // Generate a verification token
    const verificationToken = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET, // Use your JWT secret here
      { expiresIn: '1h' }
    );

    // Update the user with the generated verification token
    await newUser.update({ token: verificationToken });

    // Verification link
    const verificationLink = `http://localhost:9000/api/v1/auth/verify-email?token=${verificationToken}`;

    // Email options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: newUser.email,
      subject: `Verify your email for registration`,
      html: `
        <p>Hello,</p>
        <p>Welcome to yourApp! Please click the link below to verify your email address:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>Best regards,</p>
        <p>Your App Team</p>
      `,
    };

    // Send email
    await sendEmail(mailOptions);

    // Respond with success message
    res.status(200).json({
      status: "Register successful",
      data: {
        email: newUser.email,
      },
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: { email },
    });

    if (!user) {
      return next(new apiError("Email not found", 404));
    }
    if (!user.verified) {
      return next(new apiError("User not verified", 401));
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        status: "Success",
        message: "Login successful",
        data: token,
      });
    } else {
      return next(new apiError("Incorrect password", 401));
    }
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};



const sendEmailVerified = async (req, res, next) => {
  try {
    const { email } = req.body;
    await Auth.update(
      {
        verified: true,
      },
      {
        where: {
          email,
        },
      }
    );
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject: `Reset Password from ${AUTH_EMAIL}`,
      html: `
              <p>Hello,</p>
              <p>Thank you for verifying your email.</p>
              <p>Best regards,</p>
              <p>Team c8</p>
            `,
    };
    await sendEmail(mailOptions);
    res.status(200).json({
      status: "Success",
      message: "Email sent",
      data: email,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    await Auth.findOne({
      where: {
        email,
      },
      include: [User],
    });

    if (password !== confirmPassword) {
      return next(new ApiError("Password tidak sesuai", 400));
    }

    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const invalidLength = password.length < 8 || symbolRegex.test(password);
    if (invalidLength) {
      return next(
        new apiError(
          "Password must be at least 8 characters and contain no special characters",
          400
        )
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await Auth.update(
      {
        password: hashedPassword,
        verified: true,
      },
      {
        where: {
          email,
        },
      }
    );
    res.status(200).json({
      status: "Success",
      message: "Reset Password Successful",
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  sendEmailVerified,
};
