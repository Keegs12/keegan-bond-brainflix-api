const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const videoDataJSON = fs.readFileSync("./data/video-details.json");
let videoData = JSON.parse(videoDataJSON);

//get data
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

//Get video url id
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

//Video Upload
router.post("/", (req, res) => {
    const { title, description } = req.body;
    console.log(title, description);
    const newVideo = {
        id: uuidv4(),
        title,
        description,
        image: "http://localhost:8080/images/uploadVideo.jpg",
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

//Post a Comment
router.post("/:id/comments", (req, res) => {
    const id = req.params.id; //get video id hence the params

    const video = videoData.find((video) => video.id === id); //find the specific video

    const { comment } = req.body; //take the "posted comment" from the "body"

    const commentArray = video.comments; //get the array of comments from the specific video

    //create new comment object
    const newComment = {
        id: uuidv4(),
        name: "Anonymous",
        comment: comment,
        likes: 0,
        timestamp: Date.now(),
    };

    commentArray.push(newComment); //push new comment to the array of comments

    fs.writeFileSync("./data/video-details.json", JSON.stringify(videoData)); //write back the new data

    res.json(videoData); //respond
});

//Delete a comment
router.delete("/:id/comments/:commentId", (req, res) => {
    const videoId = req.params.id; //get videoId from url hence params

    const commentId = req.params.commentId; //get commentId from url hence params

    const video = videoData.find((video) => {
        return video.id === videoId;
    }); //find the specific video

    const videoComments = video.comments; //get the specific video comments

    const removeComment = videoComments.findIndex(
        (comment) => comment.id === commentId
    ); //find the Index of the comment we wish to remove, this will let us use splice as splice takes the index of the item we wish to remove

    videoComments.splice(removeComment, 1); //remove comment

    fs.writeFileSync("./data/video-details.json", JSON.stringify(videoData)); //write back the new data

    res.json(videoData); //respond
});
