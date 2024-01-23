const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000 || process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server started");
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
