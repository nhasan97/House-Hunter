const Users = require("../../../../schemas/Users");
const bcrypt = require("bcryptjs");

const saveUserDataInDB = async (req, res) => {
  try {
    const encriptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      role: req.body.role,
      phone: req.body.phone,
      email: req.body.email,
      password: encriptedPassword,
      profileImage: req.body.profileImage,
      timeStamp: Date.now(),
    };

    const result = await Users.create(user);
    return res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = saveUserDataInDB;
