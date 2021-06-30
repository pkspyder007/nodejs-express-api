const mongoose = require("mongoose");
const { Schema } = mongoose;

const directorSchema = new Schema({
  name: String,
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const director = mongoose.model("Director", directorSchema);

module.exports = director;
