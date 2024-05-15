import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const Listener = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await axios.get('http://localhost:5173/api/v1/podcast/');
                setPodcasts(response.data);
            } catch (error) {
                console.error('Error fetching podcasts:', error);
            }
        };

        fetchPodcasts();
    }, []);

    const openModal = async (podcastId) => {
        try {
            const response = await axios.get(`http://localhost:5173/api/v1/podcast/${podcastId}`);
            setSelectedPodcast(response.data);

            const commentsResponse = await axios.get(`http://localhost:5173/api/v1/podcast/${podcastId}`);
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('Error fetching podcast details:', error);
        }
    };

    const closeModal = () => {
        setSelectedPodcast(null);
        setComments([]);
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
                    <div className="bg-white p-8 max-w-lg w-full rounded-lg shadow-lg">
                        <audio controls src={selectedPodcast.audioUrl} className="w-full" />
                        <div className="mt-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="border-b py-2">
                                    <p className="font-bold">{comment.user.username}</p>
                                    <p>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={closeModal} className="mt-4 p-2 bg-gray-500 text-white rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Listener;
