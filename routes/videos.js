const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const videoDataJSON = fs.readFileSync("./data/video-details.json");
let videoData = JSON.parse(videoDataJSON);

router.get("/", (req, res) => {
    const videoDataJSON = fs.readFileSync("./data/video-details.json");
    let videoData = JSON.parse(videoDataJSON);
    const filteredData = [];
    for (let i = 0; i < videoData.length; i++) {
        filteredData.push({
            id: videoData[i].id,
            channel: videoData[i].channel,
            title: videoData[i].title,
            image: videoData[i].image,
        });
    }

    res.json(filteredData);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const videoDataJSON = fs.readFileSync("./data/video-details.json");
    let videoData = JSON.parse(videoDataJSON);
    const video = videoData.find((video) => video.id === id);

    if (video === undefined) {
        return res.status(404).send(`Video ${id} does not exist`);
    }

    res.json(video);
});

module.exports = router;

router.post("/", (req, res) => {
    const { image, title, description } = req.body;
    console.log(image, title, description);
    const newVideo = {
        id: uuidv4(),
        title,
        description,
        image,
        likes: 0,
        views: 0,
        channel: "Anonymous",
        timestamp: Date.now(),
        comments: [],
    };
    // console.log(newVideo);
    videoData.push(newVideo);
    fs.writeFileSync("./data/video-details.json", JSON.stringify(videoData));
    res.json(videoData);
});
