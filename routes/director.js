const router = require("express").Router();
const director = require("../models/director");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "director.html"))
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const directorData = await director.findById(id).populate("movies", "title rating _id");

    res.json(directorData);
  } catch (error) {
      res.send(JSON.stringify(error.message));
  }
});

router.post("/", async (req, res) => {
    try {
      const newDirector = await director.create(req.body);
      res.json({ ...newDirector._doc });
    } catch (error) {
      res.send(JSON.stringify(error.message));
    }
  });

module.exports = router;
