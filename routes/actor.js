const router = require("express").Router();
const actor = require("../models/actor");
const path = require("path")

router.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "actor.html"))
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const actorData = await actor.findById(id).populate("movies", "title  rating");

    res.json(actorData);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    const newActor = await actor.create(req.body);
    res.json({ ...newActor._doc });
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

module.exports = router;
