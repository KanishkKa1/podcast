import React from 'react';

const Card = ({ title, image, description, onClick }) => {
    return (
        <div className="cursor-pointer max-w-sm overflow-hidden rounded-lg shadow-lg m-4 bg-white" onClick={onClick}>
            <div style={{ height: "200px", overflow: "hidden" }}>
                <img className="w-full h-full object-cover" src={image} alt={title} />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </div>
    );
};

export default Card;
