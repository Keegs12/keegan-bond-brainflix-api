const fs = require("fs");
const app = require("express")();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const videosRoute = require("./routes/videos.js");

app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use(express.json());

app.use("/videos", videosRoute);

app.use("/images", express.static("./public/images"));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
