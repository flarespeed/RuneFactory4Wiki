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

router.get("/:id", async (req, res) => {
  const subarea = await Subarea.findOne({ _id: req.params.id }).populate("monsters");
  if (!subarea) {
    res.sendStatus(404);
  } else {
    res.send(subarea);
  }
});

router.patch("/:id", jwtMiddleware, async (req, res) => {
  const subarea = await Subarea.findOne({ _id: req.params.id });
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

router.delete("/:id", jwtMiddleware, async (req, res) => {
  const subarea = await Subarea.findOne({ _id: req.params.id });

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