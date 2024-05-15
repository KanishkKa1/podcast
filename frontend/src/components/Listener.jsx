import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Assuming you have a Card component

const Listener = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await axios.get('http://localhost:5173/podcasts'); // Update URL as per your backend route
                setPodcasts(response.data);
            } catch (error) {
                console.error('Error fetching podcasts:', error);
            }
        };

        fetchPodcasts();
    }, []);

    return (
        <div className="flex flex-wrap justify-center">
            {podcasts.map((podcast) => (
                <Card
                    key={podcast.id}
                    title={podcast.title}
                    image={podcast.imageUrl}
                    description={podcast.description}
                />
            ))}
        </div>
    );
};

export default Listener;
