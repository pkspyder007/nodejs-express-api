const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const directorRouter = require("./routes/director");
const actorRouter = require("./routes/actor");
const movieRouter = require("./routes/movie");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")))

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true},  (err) => {
    if(err) console.error("Error in DB connection: ", err);
    else console.log("Connected to DB");
})


app.use("/director", directorRouter);
app.use("/actor", actorRouter);
app.use("/movie", movieRouter);
app.get(
    "/",
    (req, res) => {
        res.sendFile(path.join(__dirname, "public", "index.html"))
    }
)

app.listen(5000, () => console.log("listening to port 5000"));