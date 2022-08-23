const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const areaRouter = require("./routes/area.routes");
const subareaRouter = require("./routes/subarea.routes");
const monsterRouter = require("./routes/monster.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/area", areaRouter);
app.use("/subarea", subareaRouter);
app.use("/monster", monsterRouter);
app.use("/user", userRoutes);

console.log(process.env.DB_URL + process.env.DB_NAME);

mongoose
  .connect(process.env.DB_URL + process.env.DB_NAME)
  .then(() => {
    console.log("DB Connected");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });