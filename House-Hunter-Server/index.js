const express = require("express");
const applyMiddleware = require("./src/middleWares/applyMiddlewares");
const connectDatabase = require("./src/database/connectDatabase");
require("dotenv").config();

const app = express();
const port = 5000 || process.env.PORT;

const usersRoutes = require("./src/routes/users/index");

const globalErrorHandler = require("./src/middleWares/globalErrorHandler");

applyMiddleware(app);

app.use(usersRoutes);

app.get("/", (req, res) => {
  res.send("server started");
});

app.all("*", (req, res, next) => {
  const err = new Error(`requested url [${req.url}] is invalid`);
  err.status = 404;
  next(err);
});

app.use(globalErrorHandler);

const main = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
};

main();
