const mongoose = require("mongoose");
const { Schema } = mongoose;

const actorSchema = new Schema({
  title: String,
  rating: String,
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor",
    },
  ],
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Director",
  },
});

const movie = mongoose.model("Movie", actorSchema);

module.exports = movie;
