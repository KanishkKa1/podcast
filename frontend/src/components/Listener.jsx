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
            {/* {podcasts.map((podcast) => (
                <Card
                    key={podcast.id}
                    title={podcast.title}
                    image={podcast.imageUrl}
                    description={podcast.description}
                />
            ))} */}
            <Card
                key="1"
                title="Some title"
                image='https://www.investopedia.com/thmb/XXPcAPRjVpwB7JFZO8qpaaXYFEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/siliconvalley.asp-FINAL-1-3280793e663e4041be8d9c96ebcb82ea.png'
                description='Something about the podcast'
            />

            <Card
                key="1"
                title="Some title"
                image='https://www.investopedia.com/thmb/XXPcAPRjVpwB7JFZO8qpaaXYFEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/siliconvalley.asp-FINAL-1-3280793e663e4041be8d9c96ebcb82ea.png'
                description='Something about the podcast'
            />

            <Card
                key="1"
                title="Some title"
                image='https://www.investopedia.com/thmb/XXPcAPRjVpwB7JFZO8qpaaXYFEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/siliconvalley.asp-FINAL-1-3280793e663e4041be8d9c96ebcb82ea.png'
                description='Something about the podcast'
            />

            <Card
                key="1"
                title="Some title"
                image='https://www.investopedia.com/thmb/XXPcAPRjVpwB7JFZO8qpaaXYFEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/siliconvalley.asp-FINAL-1-3280793e663e4041be8d9c96ebcb82ea.png'
                description='Something about the podcast'
            />

            <Card
                key="1"
                title="Some title"
                image='https://www.investopedia.com/thmb/XXPcAPRjVpwB7JFZO8qpaaXYFEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/siliconvalley.asp-FINAL-1-3280793e663e4041be8d9c96ebcb82ea.png'
                description='Something about the podcast'
            />

            <Card
                key="1"
                title="Some title"
                image='https://www.investopedia.com/thmb/XXPcAPRjVpwB7JFZO8qpaaXYFEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/siliconvalley.asp-FINAL-1-3280793e663e4041be8d9c96ebcb82ea.png'
                description='Something about the podcast'
            />

            <Card
                key="1"
                title="Some title"
                image='https://www.investopedia.com/thmb/XXPcAPRjVpwB7JFZO8qpaaXYFEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/siliconvalley.asp-FINAL-1-3280793e663e4041be8d9c96ebcb82ea.png'
                description='Something about the podcast'
            />
        </div>
    );
};

export default Listener;
