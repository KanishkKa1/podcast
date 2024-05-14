const express = require("express");
const router = express.Router();
const { bucket } = require("../db");
const multer = require("multer");

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// TODO: Zod validations
router.post("/", upload.single("file"), (req, res) => {
  const blob = bucket.file(
    `audios/${Date.now() + "-" + req.file.originalname}`
  );
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    res.status(500).send({ message: err.message });
  });

  try {
    blobStream.on("finish", async (data) => {
      bucket.file(req.file.originalname);

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
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
