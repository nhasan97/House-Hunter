const mongoose = require("mongoose");
require("dotenv").config();

const getDBUri = () => {
  let DBUri = "";

  if (process.env.NODE_ENVIRONMENT === "development") {
    DBUri = process.env.DB_LOCAL_URI;
    DBUri = DBUri.replace("<username>", process.env.DB_USER);
    DBUri = DBUri.replace("<password>", process.env.DB_PASS);
  } else {
    DBUri = process.env.DB_PROD_URI;
  }

  return DBUri;
};

const connectDatabase = async () => {
  const uri = getDBUri();
  await mongoose.connect(uri, { dbName: process.env.DB_NAME });
  console.log("connected to DB");
};

module.exports = connectDatabase;
