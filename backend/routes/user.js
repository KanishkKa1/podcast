const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { bucket } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");

const signupBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const updateBody = zod.object({
  password: zod.string().optional(),
});

// Signup
router.post("/signup", async (req, res) => {
  const { success, data } = signupBody.safeParse(req.body);
  if (!success) {
    return res.json({
      error: "Incorrect inputs",
    });
  }

  const userId = uuidv4();
  const userFileName = `users/${userId}.json`;
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(data.password, salt);
  const userMetadata = {
    email: data.email,
    password: hashedPassword,
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
    const [userFiles] = await bucket.getFiles({
      prefix: `users/`,
    });

    let found = false;
    let token = "";

    for (const userFile of userFiles) {
      let buffer = "";
      console.log(userFile.file);

      const data = await userFile.download();
      console.log(data);

      // userFile
      //   .createReadStream()
      //   .on("data", function (data) {
      //     buffer += data;
      //   })
      //   .on("end", async function () {
      //     const userData = JSON.parse(buffer);
      //     console.log(password);
      //     const passwordMatch = await bcryptjs.compare(
      //       password,
      //       userData.password
      //     );

      //     if (userData.email === email && passwordMatch) {
      //       console.log(userData, " khajajadfasdfsd");
      //       found = true;
      //       token =
      //         "Bearer " + jwt.sign({ userId: userFile.email }, JWT_SECRET);
      //       return;
      //     }
      //   });

      console.log("going again for the new file, ", found);
      if (found) {
        console.log("found it");
        break;
      }
    }

    // Send response for invalid email or password only if no valid user is found
    if (found) {
      res.json({ token });
    } else {
      res.json({ error: "Invalid email or password" });
    }
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
