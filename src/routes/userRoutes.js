const express = require("express");

const router = express.Router();

const {registration, login} = require ( "../controllers/userController" );
// post/api/registrater/user

router.post("/register", registration);
router.post("/login", login);
module.exports = router;
