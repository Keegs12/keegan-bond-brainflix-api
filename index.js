const fs = require("fs");
const app = require("express")();
const express = require("express");

const cors = require("cors");
const videosRoute = require("./routes/videos.js");

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use(express.json());

app.use("/videos", videosRoute);

app.use("/images", express.static("./public/images"));

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
