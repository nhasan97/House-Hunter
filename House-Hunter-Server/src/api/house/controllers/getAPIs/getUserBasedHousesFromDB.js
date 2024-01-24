const Houses = require("../../../../schemas/Houses");

const getUserBasedHousesFromDB = async (req, res) => {
  try {
    if (req.user.email !== req.query.email) {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    query = { email: req.query.email };
    const result = await Houses.find(query);
    res.send(result);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = getUserBasedHousesFromDB;
