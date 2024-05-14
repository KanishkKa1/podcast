const express = require("express");
const router = express.Router();
const { bucket } = require("../db");
const multer = require("multer");
const { authMiddleware } = require("../middleware");
const db = require("../prisma/index.js");

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/:podcastId", authMiddleware, async (req, res) => {
  const { podcastId } = req.params;

  try {
    const podcast = await db.podcast.findUnique({
      where: {
        id: podcastId,
      },
    });

    if (!podcast) {
      return res.status(404).send({ message: "Podcast not found" });
    }

    const file = bucket.file(podcast.audioUrl);

    res.set({
      "Content-Type": "audio/mpeg", // Adjust content type based on the audio file format
    });

    const audioStream = file.createReadStream();
    audioStream.pipe(res);

    // audioStream.on("end", () => {
    //   res.status(200).send({ message: "Success" });
    // });

    audioStream.on("error", (err) => {
      console.error("Error streaming audio file:", err);
      res.status(500).send({ message: "Error streaming audio file" });
    });
  } catch (error) {
    console.error("Error retrieving podcast: ", error);
    res.status(500).send({ message: "Error retrieving podcast" });
  }
});

// TODO: Zod validations
router.post("/", authMiddleware, upload.single("file"), (req, res) => {
  const fileName = `audios/${Date.now() + "-" + req.file.originalname}`;
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    res.status(500).send({ message: err.message });
  });

  try {
    blobStream.on("finish", async (data) => {
      const uploadedAudio = await db.podcast.create({
        data: {
          audioUrl: fileName,
          user: {
            connect: {
              id: req.userId,
            },
          },
        },
      });

      return res.status(200).send({
        message: "Uploaded the file successfully",
        audioId: uploadedAudio.id,
      });
    });
    blobStream.end(req.file.buffer);
  } catch {
    return res.status(500).send({
      message: `Some error has occured.`,
    });
  }
});

module.exports = router;
