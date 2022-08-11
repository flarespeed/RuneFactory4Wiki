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
  const { areaName } = req.body
  const areaFound = await Area.findOne({ areaName });
  if (areaFound || areaName.toLowerCase() == "arealist") {
    return res.status(409).send({ errors: "areaName exists" });
  }
  const area = new Area(req.body);
  await area.save();
  res.send(area);
});

router.get("/arealist", async (req, res) => {
  const area = await Area.find({});
  res.send(area);
});

router.get("/:areaName", async (req, res) => {
  const area = await Area.findOne({ name: req.params.areaName }).populate("subareas");
  if (!area) {
    res.sendStatus(404);
  } else {
    res.send(area);
  }
});

router.patch("/:name", jwtMiddleware, async (req, res) => {
  const area = await Area.findOne({ name: req.params.name });
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

router.delete("/:name", jwtMiddleware, async (req, res) => {
  const area = await Area.findOne({ name: req.params.name });

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