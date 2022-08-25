const { Router } = require("express");
const Monster = require("../models/Monster");
const Subarea = require("../models/Subarea");
const User = require("../models/User");
const jwtMiddleware = require("../helpers/jwt-middleware");

const router = Router();


router.post("/", jwtMiddleware, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }
  const { monsterName } = req.body
  const monsterFound = await Monster.findOne({ monsterName });
  if (monsterFound || monsterName.toLowerCase() == "monsterlist") {
    return res.status(409).send({ errors: "monsterName exists" });
  }
  const monster = new Monster(req.body);
  await monster.save();
  res.send(monster);
});

router.get("/monsterlist", async (req, res) => {
  const monster = await Monster.find({});
  res.send(monster);
});

router.get("/:_id", async (req, res) => {
  const monster = await Monster.findOne({ _id: req.params._id });
  if (!monster) {
    res.sendStatus(404);
  } else {
    res.send(monster);
  }
});

router.patch("/:_id", jwtMiddleware, async (req, res) => {
  const monster = await Monster.findOne({ _id: req.params._id });
  if (!monster) {
    return res.sendStatus(404);
  }
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }

  const monsterData = req.body;

  monster.set(monsterData);

  await monster.save();

  res.send(monster);
});

router.delete("/:_id", jwtMiddleware, async (req, res) => {
  const monster = await Monster.findOne({ _id: req.params._id });

  if (!monster) {
    return res.sendStatus(404);
  }
  if (!req.user.isAdmin) {
    return res.status(403).send("unauthorized");
  }

  await monster.remove();
  res.send(monster);
});


module.exports = router;