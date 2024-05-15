require("dotenv").config();
const zod = require("zod");

const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().optional(),
  email: zod.string().email().optional(),
  password: zod.string(),
});

module.exports = {
  JWT_SECRET,
  signupBody,
  signinBody,
};
