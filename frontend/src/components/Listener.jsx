import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { FaTimes, FaHeart } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";
import Cookies from "js-cookie";

const Listener = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get("/api/v1/podcast", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPodcasts(response.data.podcasts);
      } catch (error) {
        console.error("Error fetching podcasts: ", error);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    const fetchUserPodcasts = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.get("/api/v1/podcast/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPodcasts(response.data.podcasts);
      } catch (error) {
        console.error("Error fetching current user's podcasts: ", error);
      }
    };

    fetchUserPodcasts();
  }, []);

  const openModal = async (podcastId) => {
    setSelectedPodcast(podcastId);
    axios
      .get(`/api/v1/podcast/${podcastId}`)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching podcast details: ", error);
      });
    setUpvoted(false);
  };

  const closeModal = () => {
    setSelectedPodcast(null);
    setComments([]);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = () => {
    if (newComment.trim() === "") {
      return; 
    }

    axios
      .post(`/api/v1/comment/${selectedPodcast}`, { comment: newComment })
      .then((response) => {
        setComments([...comments, response.data.comment]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  };

  const handleUpvote = () => {
    axios
      .post(`/api/v1/comment/${selectedPodcast}/upvote`)
      .then((response) => {
        setUpvoted(!upvoted);
        setUpvoteCount(response.data.comment.upvotes);
      })
      .catch((error) => {
        console.error("Error toggling upvote: ", error);
      });
  };

  return (
    <div className="flex flex-wrap justify-center bg-slate-200">
      {podcasts.map((podcast) => (
        <Card
          key={podcast.id}
          title={podcast.title}
          image={podcast.image}
          description={podcast.content}
          onClick={() => openModal(podcast.id)}
        />
      ))}
      {selectedPodcast && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-lg w-full rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-4 text-gray-500"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedPodcast.title}</h2>
            <p className="text-gray-700 mb-4">{selectedPodcast.content}</p>
            <audio controls src={selectedPodcast.audioUrl} className="w-full" />
            <div className="mt-4 flex items-center">
              <button
                onClick={handleUpvote}
                className={`text-xl hover:text-2xl ${
                  upvoted ? "text-red-500" : "text-gray-500"
                }`}
              >
                <BiSolidUpvote />
              </button>
              <span className="ml-2">{upvoteCount}</span>
            </div>
            <div className="mt-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b py-2">
                  <p className="font-bold">{comment.user.username}</p>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="w-full border rounded p-2"
              />
              <button
                onClick={addComment}
                className="mt-2 bg-gray-500 text-white rounded p-2"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listener;
