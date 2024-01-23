const express = require("express");
const { saveUserDataInDB, userLogin } = require("../../api/user");

const router = express.Router();

router.post("/users", saveUserDataInDB);
router.post("/login", userLogin);

module.exports = router;
