const router = require("express").Router();
const Auth = require("./authRouter");

router.use("/api/v1/auth", Auth);

module.exports = router;
