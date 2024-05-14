const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, signinBody, signupBody } = require("../config");
const bcryptjs = require("bcryptjs");
const db = require("../prisma/index.js");

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

    const token =
      "Bearer " +
      jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
    console.log(token, " token generateds");

    res.status(200).json({
      token: token,
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    console.log("Error while signup: ", error);
    return res.status(500).json({ message: "Some error has occurred" });
  }
});

// Signin
router.post("/signin", async (req, res) => {
  try {
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
    });

    if (userExists) {
      const passwordMatch = await bcryptjs.compare(
        password,
        userExists.password
      );

      if (!passwordMatch) {
        return res.status(404).json({ error: "Invalid credentials" });
      }

      const token =
        "Bearer " +
        jwt.sign(
          { userId: userExists.id, username: userExists.username },
          JWT_SECRET
        );

      res.status(200).json({
        token: token,
        userId: userExists.id,
        username: userExists.username,
      });
    } else {
      return res.status(401).json({ error: "No user found" });
    }
  } catch (error) {
    console.log("Error while signin: ", error);
    return res.status(500).json({ message: "Some error has occurred" });
  }
});

module.exports = router;
