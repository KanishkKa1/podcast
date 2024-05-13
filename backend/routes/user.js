const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { bucket } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");

const baseUsernames = ["rain", "water", "rainbow"];

const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

// Signup
router.post("/signup", async (req, res) => {
  const { success, data } = signupBody.safeParse(req.body);
  if (!success) {
    return res.json({
      error: "Incorrect inputs",
    });
  }

  const baseUsername =
    baseUsernames[Math.floor(Math.random() * baseUsernames.length)];

  const randomNumber = Math.floor(Math.random() * 1000);
  const username = `${baseUsername}${randomNumber}`;

  const userId = uuidv4();
  const userFileName = `users/${userId}.json`;
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(data.password, salt);
  const userMetadata = {
    username: username,
    email: data.email,
    password: hashedPassword,
    firstName: data.firstName,
    lastName: data.lastName,
  };
  const userFile = bucket.file(userFileName);
  await userFile.save(JSON.stringify(userMetadata));

  const token = "Bearer " + jwt.sign({ userId }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token: token,
  });
});

// Signin
router.post("/signin", async (req, res) => {
  const { success, data } = signinBody.safeParse(req.body);
  if (!success) {
    return res.json({
      error: "Incorrect inputs",
    });
  }

  const email = data.email;
  const password = data.password;

  try {
    const userFiles = await bucket.getFiles({
      prefix: `users/`,
    });

    for (const userFile of userFiles[0]) {
      const [userMetadata] = await userFile.get();
      const userData = JSON.parse(userMetadata.toString());

      if (userData.email === email && userData.password === password) {
        const token = jwt.sign({ userId: userData.userId }, JWT_SECRET);
        return res.json({ token });
      }
    }

    res.json({ error: "Invalid email or password" });
  } catch (error) {
    console.error("Error during user signin:", error);
    res.json({ error: "Error during signin" });
  }
});

// Update
router.put("/", authMiddleware, async (req, res) => {
  const { success, data } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      error: "Error while updating information",
    });
  }

  const userId = req.userId;
  const userFileName = `users/${userId}.json`;
  const userFile = bucket.file(userFileName);
  try {
    const [userMetadata] = await userFile.get();
    const userData = JSON.parse(userMetadata.toString());
    const updatedUserData = { ...userData, ...data };
    await userFile.save(JSON.stringify(updatedUserData));

    res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).json({ error: "Error during update" });
  }
});

module.exports = router;
