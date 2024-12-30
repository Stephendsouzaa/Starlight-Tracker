import React, { useEffect, useState } from 'react';


const StarLightFeature = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data'); // Fetching data from the Flask backend
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStars(data.stars);
            } catch (error) {
                console.error('Error fetching star data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h2>Stars</h2>
            <ul>
                {stars.length > 0 ? (
                    stars.map((star, index) => (
                        <li key={index}>{star}</li>
                    ))
                ) : (
                    <li>No stars available</li>
                )}
            </ul>
        </div>
    );
};

export default StarLightFeature;
