require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Connection = require("./database/config");
const app = express();
const userRoute = require("./routes/route");
const authRoute = require("./routes/auth");

PORT = 8181 || process.env.PORT;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
Connection();
app.use(cors());

app.use(authRoute);
app.use("/users", userRoute);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);
});
