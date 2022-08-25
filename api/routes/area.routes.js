const { Router } = require("express");
const Area = require("../models/Area");
const Subarea = require("../models/Subarea");
const User = require("../models/User");
const jwtMiddleware = require("../helpers/jwt-middleware");

const router = Router();


router.post("/", jwtMiddleware, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }
  let { name } = req.body
  name = name.toLowerCase()
  const areaFound = await Area.findOne({ name });
  if (areaFound || name == "arealist") {
    return res.status(409).send({ errors: "name exists" });
  }
  const area = new Area(req.body);
  await area.save();
  res.send(area);
});

router.get("/arealist", async (req, res) => {
  const area = await Area.find({});
  res.send(area);
});

router.get("/:_id", async (req, res) => {
  const area = await Area.findOne({ _id: req.params._id }).populate("subareas");
  if (!area) {
    res.sendStatus(404);
  } else {
    res.send(area);
  }
});

router.patch("/:_id", jwtMiddleware, async (req, res) => {
  const area = await Area.findOne({ _id: req.params._id });
  if (!area) {
    return res.sendStatus(404);
  }
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }

  const areaData = req.body;

  area.set(areaData);

  await area.save();

  res.send(area);
});

router.delete("/:_id", jwtMiddleware, async (req, res) => {
  const area = await Area.findOne({ _id: req.params._id });

  if (!area) {
    return res.sendStatus(404);
  }
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }

  await area.remove();
  res.send(area);
});


module.exports = router;