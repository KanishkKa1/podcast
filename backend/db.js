require("dotenv").config();

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "key.json", // GCP Service Account key file name
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

module.exports = {
  bucket,
};
