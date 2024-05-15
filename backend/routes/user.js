const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET, signinBody, signupBody } = require("../config");
const bcryptjs = require("bcryptjs");
const db = require("../prisma/index.js");
const { authMiddleware } = require("../middleware.js");

// signup
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

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET
    );

    // Send token in response headers
    res.setHeader("Authorization", "Bearer " + token);
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

// signin
router.post("/signin", async (req, res) => {
  try {
    const { success, data } = signinBody.safeParse(req.body);

    if (!success) {
      return res.status(401).json({
        error: "Incorrect inputs",
      });
    }

    const email = data.email;
    const username = data.username;
    const password = data.password;

    if (!email && !username) {
      return res.status(401).json({
        error: "Incorrect inputs",
      });
    }

    let userExists =
      email &&
      (await db.user.findUnique({
        where: {
          email: email,
        },
      }));

    if (!userExists) {
      userExists = await db.user.findUnique({
        where: {
          username: username,
        },
      });
    }

    if (userExists) {
      const passwordMatch = await bcryptjs.compare(
        password,
        userExists.password
      );

      if (!passwordMatch) {
        return res.status(404).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: userExists.id, username: userExists.username },
        JWT_SECRET
      );

      // Send token in response headers
      res.setHeader("Authorization", "Bearer " + token);
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

// profile
router.get("/profile", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
      const userId = decodedToken.userId;
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          username: true,
        },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.json({ error: "Unauthorized" });
  }
});

module.exports = router;
