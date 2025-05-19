const express = require("express");

const router = express.Router();

const {registration} = require ( "../controllers/userController" );
// post/api/registrater/user

router.post("/register", registration);
module.exports = router;
