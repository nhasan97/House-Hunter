const express = require("express");
const verifyToken = require("../../middleWares/verifyToken");

const { getUserBasedHousesFromDB } = require("../../api/house");

const router = express.Router();

router.get("/user-houses", verifyToken, getUserBasedHousesFromDB);

module.exports = router;
