const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware.js");
const db = require("../prisma/index.js");

router.post("/:podcastId", authMiddleware, async (req, res) => {
  const { podcastId } = req.params;
  const { comment } = req.body;

  try {
    const existingPodcast = await db.podcast.findUnique({
      where: {
        id: podcastId,
      },
    });

    if (!existingPodcast) {
      return res.status(404).send({ message: "Podcast not found" });
    }

    const createdComment = await db.comment.create({
      data: {
        content: comment,
        upvotes: 0,
        podcast: {
          connect: {
            id: podcastId,
          },
        },
        user: {
          connect: {
            id: req.userId,
          },
        },
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(201).send({
      message: "Comment added successfully",
      comment: createdComment,
    });
  } catch (error) {
    console.error("Error adding comment: ", error);
    res.status(500).send({ message: "Error adding comment" });
  }
});

router.get("/:podcastId/:num", authMiddleware, async (req, res) => {
  const { podcastId, num } = req.params;

  try {
    const comments = await db.comment.findMany({
      where: {
        podcastId: podcastId,
      },
      take: parseInt(num),
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(200).send({ comments });
  } catch (error) {
    console.error("Error fetching comments: ", error);
    res.status(500).send({ message: "Error fetching comments" });
  }
});



router.post("/:commentId/upvote", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;

  try {
    const existingUpvote = await db.upvoter.findFirst({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });

    const existingComment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!existingComment) {
      return res.status(404).send({ message: "Comment not found" });
    }

    if (existingUpvote) {
      await db.upvoter.delete({
        where: {
          id: existingUpvote.id,
        },
      });

      const updatedComment = await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          upvotes: {
            decrement: 1,
          },
        },
      });

      res.status(200).send({
        message: "Comment upvote removed",
        comment: updatedComment,
      });
    } else {
      await db.upvoter.create({
        data: {
          userId: userId,
          commentId: commentId,
        },
      });

      const updatedComment = await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          upvotes: {
            increment: 1,
          },
        },
      });

      res.status(200).send({
        message: "Comment upvoted successfully",
        comment: updatedComment,
      });
    }
  } catch (error) {
    console.error("Error toggling upvote: ", error);
    res.status(500).send({ message: "Error toggling upvote" });
  }
});

module.exports = router;
