const express = require("express");
const cors = require("cors");
const multer = require("multer");
const FFmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "videoStorage");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).single("file");

const processLowResVideo = (videoUploaded) => {
  return new Promise((resolve, reject) => {
    new FFmpeg({ source: videoUploaded.path })
      .withVideoCodec("libx264")
      .withAudioCodec("aac")
      .withSize("640x?")
      .applyAutopadding(true)
      .toFormat("mp4")
      .on("start", function (commandLine) {
        console.log("Spawned FFmpeg with command: " + commandLine);
      })
      .on("progress", function (progress) {
        console.log("Processing: " + progress.percent + "% done");
      })
      .on("error", function (err) {
        console.log("Cannot process video: " + err.message);
        reject(err);
      })
      .on("end", function () {
        console.log("Processing finished successfully");
        resolve();
      })
      .saveToFile(
        `./videoLowRes/${Date.now()}-lowRes-${
          path.parse(videoUploaded.originalname).name
        }.mp4`
      );
  });
};

const getVideoLowResList = () => fs.readdirSync("./videoLowRes", (err, files) => {
  if (err) {
    return err;
  } else {
    return files;
  }
});

app.post("/upload", multer({ storage }).single("file"), async (req, res) => {
  try {
    const lowRes = await processLowResVideo(req.file);
    return res.status(200).send(lowRes);
  } catch (error) {
    return res.status(500).send("Error", error);
  }
});

app.get("/files", async (req, res) => {
  const list = getVideoLowResList();
  res.status(200).send(list)
});

app.get("/files/:videoName", (req, res) => {
  const video = req.params.videoName
  res.status(200).sendFile(`./videoLowRes/${video}`, { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
