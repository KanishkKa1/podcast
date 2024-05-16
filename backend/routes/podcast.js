const express = require("express");
const router = express.Router();
const { bucket } = require("../db.js");
const multer = require("multer");
const { authMiddleware } = require("../middleware.js");
const db = require("../prisma/index.js");

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const podcasts = await db.podcast.findMany({
      where: {
        userId: req.userId,
      },
      select: {
        id: true,
        userId: true,
        title: true,
        content: true,
        image: true,
        tags: true,
        createdAt: true,
      },
    });

    res.status(200).send({ podcasts });
  } catch (error) {
    console.log("Error while retrieving products: ", error);
    res.status(500).send({ message: "Error retrieving podcasts" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const podcasts = await db.podcast.findMany({
      select: {
        id: true,
        userId: true,
        title: true,
        content: true,
        image: true,
        tags: true,
        createdAt: true,
      },
    });

    res.status(200).send({ podcasts });
  } catch (error) {
    console.log("Error while retrieving products: ", error);
    res.status(500).send({ message: "Error retrieving podcasts" });
  }
});

router.get("/:podcastId", authMiddleware, async (req, res) => {
  const { podcastId } = req.params;

  try {
    const podcast = await db.podcast.findUnique({
      where: {
        id: podcastId,
      },
      include: {
        comments: true,
      },
    });

    if (!podcast) {
      return res.status(404).send({ message: "Podcast not found" });
    }

    return res.status(200).json(podcast);
  } catch (error) {
    console.error("Error retrieving podcast: ", error);
    res.status(500).send({ message: "Error retrieving podcast" });
  }
});

router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  async (req, res) => {
    // Changed to async function for better error handling
    try {
      const { title, content } = req.body;
      const tags = JSON.parse(req.body.tags); // Parse tags to ensure it's an array

      const image = req.files["image"]?.[0];
      const audio = req.files["audio"][0];

      const imageFileName = `images/${Date.now() + "-" + image.originalname}`;
      const imageBlob = bucket.file(imageFileName);
      const imageBlobStream = imageBlob.createWriteStream({
        resumable: false,
      });

      const audioFileName = `audios/${Date.now() + "-" + audio.originalname}`;
      const audioBlob = bucket.file(audioFileName);
      const audioBlobStream = audioBlob.createWriteStream({
        resumable: false,
      });

      imageBlobStream.on("error", (err) => {
        res.status(500).send({ message: err.message });
      });

      audioBlobStream.on("error", (err) => {
        res.status(500).send({ message: err.message });
      });

      const audioStreamFinished = new Promise((resolve, reject) => {
        audioBlobStream.on("finish", resolve);
      });
      const imageStreamFinished = new Promise((resolve, reject) => {
        imageBlobStream.on("finish", resolve);
      });

      Promise.all([imageStreamFinished, audioStreamFinished]).then(async () => {
        try {
          await audioBlob.makePublic();
          await imageBlob.makePublic();

          const uploadedPodcast = await db.podcast.create({
            data: {
              title,
              content,
              tags, // Use parsedTags here
              image: imageBlob.publicUrl(),
              audioUrl: audioBlob.publicUrl(),
              user: {
                connect: {
                  id: req.userId,
                },
              },
            },
          });

          return res.status(200).send({
            message: "Podcast uploaded successfully",
            podcastId: uploadedPodcast.id,
          });
        } catch (error) {
          console.log("Error: ", error);
          return res.status(500).send({
            message: `Some error has occurred.`,
          });
        }
      });

      audioBlobStream.end(audio.buffer);
      imageBlobStream.end(image.buffer);
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).send({
        message: `Some error has occurred.`,
      });
    }
  }
);
module.exports = router;


module.exports = router;
