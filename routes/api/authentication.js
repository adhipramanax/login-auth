var express = require("express");
var router = express.Router();

const { authUser } = require("../../controllers/api/authentication.controller");

// auth user
router.post("/auth", authUser);

module.exports = router;
