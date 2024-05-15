import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { FaTimes, FaHeart } from 'react-icons/fa';

const Listener = () => {
    const [podcasts, setPodcasts] = useState([
        {
            id: 1,
            title: 'Podcast 1',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
            description: 'Description of Podcast 1',
            audioUrl: 'https://example.com/audio1.mp3',
        },
        {
            id: 2,
            title: 'Podcast 2',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
            description: 'Description of Podcast 2',
            audioUrl: 'https://example.com/audio2.mp3',
        },
        {
            id: 3,
            title: 'Podcast 3',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
            description: 'Description of Podcast 3  ',
            audioUrl: 'https://example.com/audio2.mp3',
        },
        {
            id: 4,
            title: 'Podcast 4',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg',
            description: 'Description of Podcast 4',
            audioUrl: 'https://example.com/audio2.mp3',
        }
    ]);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [comments, setComments] = useState([
        {
            id: 1,
            user: {
                username: 'User1',
            },
            content: 'Comment 1 for Podcast 1',
        },
        {
            id: 2,
            user: {
                username: 'User2',
            },
            content: 'Comment 2 for Podcast 1',
        },
    ]);
    const [newComment, setNewComment] = useState('');
    const [upvoted, setUpvoted] = useState(false);

    const openModal = async (podcastId) => {
        const podcast = podcasts.find(podcast => podcast.id === podcastId);
        setSelectedPodcast(podcast);
        const podcastComments = comments.filter(comment => comment.id === podcastId);
        setComments(podcastComments);
        setUpvoted(false); // Reset upvote state when opening modal
    };

    const closeModal = () => {
        setSelectedPodcast(null);
        setComments([]);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const addComment = () => {
        if (newComment.trim() === '') {
            return; // Do not add empty comment
        }

        const newCommentObj = {
            id: comments.length + 1,
            user: {
                username: 'UserX', // Assuming a default username for now
            },
            content: newComment,
        };
        setComments([...comments, newCommentObj]);
        setNewComment('');
    };

    const handleUpvote = () => {
        if (upvoted == true) {
            setUpvoted(false);
        }
        if (upvoted == false) {
            setUpvoted(true);
        }
    };

    return (
        <div className="flex flex-wrap justify-center">
            {podcasts.map((podcast) => (
                <Card
                    key={podcast.id}
                    title={podcast.title}
                    image={podcast.imageUrl}
                    description={podcast.description}
                    onClick={() => openModal(podcast.id)}
                />
            ))}
            {selectedPodcast && (
                <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 max-w-lg w-full rounded-lg shadow-lg relative">
                        <button onClick={closeModal} className="absolute top-0 right-0 m-4 text-gray-500">
                            <FaTimes />
                        </button>
                        <h2 className="text-2xl font-bold mb-2">{selectedPodcast.title}</h2>
                        <p className="text-gray-700 mb-4">{selectedPodcast.description}</p>
                        <audio controls src={selectedPodcast.audioUrl} className="w-full" />
                        <div className="mt-4">
                            <button onClick={handleUpvote} className={`text-xl ${upvoted ? 'text-red-500' : 'text-gray-500'}`}>
                                <FaHeart /> {/* Heart icon */}
                            </button>
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
                            <button onClick={addComment} className="mt-2 bg-gray-500 text-white rounded p-2">
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
