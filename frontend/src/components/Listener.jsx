import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "./Card";
import { FaTimes, FaHeart } from "react-icons/fa";
import { BiLogIn, BiSolidUpvote } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../context/userContext";

const Listener = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [upvoted, setUpvoted] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
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
    }
  }, [user, navigate]);

  const openModal = async (podcastId) => {
    const token = Cookies.get("token");
    setSelectedPodcast(podcastId);
    axios
      .get(`/api/v1/podcast/${podcastId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSelectedPodcast(response.data);
        fetchTopComments(podcastId); // Fetch top comments when a podcast is opened
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
    const token = Cookies.get("token");
    if (newComment.trim() === "") {
      return;
    }
    axios
      .post(
        `/api/v1/comment/${selectedPodcast.id}`,
        { comment: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setComments([response.data.comment, ...comments]);
        setNewComment("");
      })
      .catch((error) => {
        toast.error("Error adding comment, please try again later!");
        console.error("Error adding comment: ", error);
      });
  };

  const fetchTopComments = (podcastId) => {
    const token = Cookies.get("token");
    axios
      .get(`/api/v1/comment/${podcastId}/3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((error) => {
        toast.error("Error fetching comments, please try again later!");
        console.error("Error fetching comments: ", error);
      });
  };

  return (
    <div className="bg-slate-200 p-1">
      <h1 className="text-2xl text-center m-3">Podcasts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center bg-slate-200">
        {podcasts.map((podcast) => (
          <Card
            key={podcast.id}
            title={podcast.title}
            image={podcast.image}
            description={podcast.content}
            onClick={() => openModal(podcast.id)}
          />
        ))}
      </div>
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
            <div className="mt-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b py-2">
                  <p className="font-bold">{comment.user.username}</p>
                  <p>{comment.content}</p>
                  <button
                    className={`text-xl hover:text-2xl ${
                      upvoted ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    <BiSolidUpvote />
                  </button>
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
