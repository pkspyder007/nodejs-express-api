const mongoose = require( 'mongoose');
const { Schema } = mongoose;

const actorSchema = new Schema({
  name:  String, 
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  }],
});


const actor = mongoose.model('Actor', actorSchema);

module.exports = actor;