const router = require("express").Router();
const director = require("../models/director");
const movie = require("../models/movie");
const actor = require("../models/actor");

router.get("/all", async (req, res) => {
  try {
    const moviesData = await movie
      .find({})
      .populate("artists", "name _id")
      .populate("director", "name id");

    res.json(moviesData);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const movieData = await movie
      .findById(id)
      .populate("artists")
      .populate("director");

    res.json(movieData);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});
router.post("/", async (req, res) => {
  try {
    const newMovie = await movie.create(req.body);

    // add movie ref to director and actor
    const directorData = await director.findById(req.body.director);
    directorData.movies = [newMovie._id, ...directorData.movies];
    await directorData.save();

    req.body.artists.forEach(async (actorId) => {
      const actorData = await actor.findById(actorId);
      actorData.movies = [newMovie._id, ...actorData.movies];
      await actorData.save();
    });

    res.json({ ...newMovie._doc });
  } catch (error) {
    console.error(error);
    res.send(JSON.stringify(error.message));
  }
});

module.exports = router;
