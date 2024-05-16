require("dotenv").config();
const zod = require("zod");

const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signinBody = zod.object({
  emailOrUsername: zod.string(),
  password: zod.string(),
});

module.exports = {
  JWT_SECRET,
  signupBody,
  signinBody,
};
