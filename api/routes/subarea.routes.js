const { Router } = require("express");
const Subarea = require("../models/Subarea");
const Monster = require("../models/Monster");
const User = require("../models/User.model");
const jwtMiddleware = require("../helpers/jwt-middleware");

const router = Router();


router.post("/", jwtMiddleware, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }
  
  const subarea = new Subarea(req.body);
  await subarea.save();
  res.send(subarea);
});

router.get("/:subareaName", async (req, res) => {
  const subarea = await Subarea.findOne({ name: req.params.subareaName }).populate("monsters");
  if (!subarea) {
    res.sendStatus(404);
  } else {
    res.send(subarea);
  }
});

router.patch("/:name", jwtMiddleware, async (req, res) => {
  const subarea = await Subarea.findOne({ name: req.params.name });
  if (!subarea) {
    return res.sendStatus(404);
  }
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }

  const subareaData = req.body;

  subarea.set(subareaData);

  await subarea.save();

  res.send(subarea);
});

router.delete("/:name", jwtMiddleware, async (req, res) => {
  const subarea = await Subarea.findOne({ name: req.params.name });

  if (!subarea) {
    return res.sendStatus(404);
  }
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }

  await subarea.remove();
  res.send(subarea);
});


module.exports = router;