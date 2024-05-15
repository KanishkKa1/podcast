require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4000;

// middlware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

//routes
app.use("/api/v1", require("./routes/index"));

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
