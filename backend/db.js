
require("dotenv").config();

const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

module.exports = {
  bucket, 
};
