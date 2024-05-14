const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcryptjs = require("bcryptjs");
const db = require("../prisma/index.js");

const signupBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { success, data } = signupBody.safeParse(req.body);

    if (!success) {
      return res.status(401).json({
        error: "Incorrect inputs",
      });
    }

    const userExists = await db.user.findUnique({
      where: {
        email: data.email,
        username: data.username,
      },
    });

    if (userExists) {
      return res.status(401).json({
        error: "Username and email should be unique",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);
    const user = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const token = "Bearer " + jwt.sign({ id: user.id }, JWT_SECRET);
    console.log(token, " token generateds");

    res.status(200).json({
      token: token,
      userId: user.id,
      username: user.username,
    });
  } catch {
    return res.status(500);
  }
});

// Signin
router.post("/signin", async (req, res) => {
  const { success, data } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(401).json({
      error: "Incorrect inputs",
    });
  }

  const email = data.email;
  const password = data.password;

  const userExists = await db.user.findUnique({
    where: {
      email: email,
    },
    include: {
      podcasts: {
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      },
    },
  });

  if (userExists) {
    const passwordMatch = await bcryptjs.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const token =
      "Bearer " +
      jwt.sign(
        { userId: userExists.id, username: userExists.username },
        JWT_SECRET
      );

    console.log(userExists.podcasts);
    res.status(200).json({
      token: token,
      userId: userExists.id,
      username: userExists.username,
      ...userExists.podcasts,
    });
  } else {
    return res.status(401).json({ error: "No user found" });
  }
});

module.exports = router;
