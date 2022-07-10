const OrderController = require("../controllers/orderController");
const express = require("express");

const router = express.Router();

router.post("/", OrderController.CreateOrder);

module.exports = router;
