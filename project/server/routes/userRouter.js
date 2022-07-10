const userController = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.post("/authenticate", userController.getAuthenticate);

module.exports = router;
