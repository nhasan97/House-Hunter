const bcrypt = require("bcryptjs");
const Users = require("../../../../schemas/Users");

const userLogin = async (req, res) => {
  const user = await Users.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    return res.send(user);
  } else {
    res.send({ error: true, message: error.message });
  }
};

module.exports = userLogin;
