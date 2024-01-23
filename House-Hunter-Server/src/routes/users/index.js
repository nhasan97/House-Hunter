const express = require("express");
const { saveUserDataInDB } = require("../../api/user");

const router = express.Router();

router.post("/users", saveUserDataInDB);

module.exports = router;
