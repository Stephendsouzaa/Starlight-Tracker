import React, { useState, useEffect } from 'react';
import alphacentauriImage from './alphacentauri.jpg';
import betelgeuseiImage from './betelgeuse.jpg';
import SiriusiImage from './Sirius.jpg';
import RigeliImage from './Rigel.jpg';



function StarInfo() {
    const [starData, setStarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStarData = async () => {
            try {
                const apiKey = 'h45eckHmCOuJrZOjV7P4ISbWz0dXCigPj2in0ZxP'; // Your NASA API Key
                // Example URL: Placeholder for an API that returns multiple star details
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch star data');
                }

                const data = await response.json();

                // Simulating multiple stars with mock data
                setStarData([
                    {
                        name: "Rigel",
                        distance: "860 light years",
                        type: "Blue Supergiant",
                        magnitude: "0.12",
                        spectralType: "B8Ia",
                        luminosity: "120,000 L☉",
                        imageUrl: RigeliImage,
                        description: "Rigel is a blue supergiant star located in the constellation Orion. It is one of the most luminous stars in our galaxy."
                    },
                    {
                        name: "Alpha Centauri",
                        distance: "4.37 light years",
                        type: "Main Sequence Star",
                        magnitude: "-0.27",
                        spectralType: "G2V",
                        luminosity: "1.5 L☉",
                        imageUrl: alphacentauriImage,
                        description: "Alpha Centauri is the closest star system to Earth, consisting of three stars: Alpha Centauri A, Alpha Centauri B, and Proxima Centauri."
                    },
                    {
                        name: "Betelgeuse",
                        distance: "642.5 light years",
                        type: "Red Supergiant",
                        magnitude: "0.42",
                        spectralType: "M2Iab",
                        luminosity: "100,000 L☉",
                        imageUrl: betelgeuseiImage,
                        description: "Betelgeuse is a red supergiant star located in the Orion constellation, and is one of the largest visible stars to the naked eye."
                    },
                    {
                        name: "Sirius",
                        distance: "8.6 light years",
                        type: "Main Sequence Star",
                        magnitude: "-1.46",
                        spectralType: "A1V",
                        luminosity: "25 L☉",
                        imageUrl: SiriusiImage,
                        description: "Sirius is the brightest star in the night sky, located in the constellation Canis Major. It is a binary star system, consisting of Sirius A and Sirius B."
                    },
                    
                    // Add more star details here...
                ]);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStarData();
    }, []);

    // Display loading state
    if (loading) {
        return <p>Loading star information...</p>;
    }

    // Display error message if there's an error
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Star Information</h2>
            <div style={styles.scrollContainer}>
                {starData.length > 0 ? (
                    starData.map((star, index) => (
                        <div key={index} style={styles.starCard}>
                            <h3 style={styles.starName}>{star.name}</h3>
                            <img
                                src={star.imageUrl}
                                alt={star.name}
                                style={styles.starImage}
                            />
                            <p><strong>Distance:</strong> {star.distance}</p>
                            <p><strong>Type:</strong> {star.type}</p>
                            <p><strong>Magnitude:</strong> {star.magnitude}</p>
                            <p><strong>Spectral Type:</strong> {star.spectralType}</p>
                            <p><strong>Luminosity:</strong> {star.luminosity}</p>
                            <p>{star.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No star information available.</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxHeight: '100vh',
        overflowY: 'auto',
        padding: '100px',
        width: '57%',
        borderRadius: '5px',
        margin: '0 auto', // Centers horizontally
        display: 'flex', // Enables flexbox for centering
        justifyContent: 'center', // Centers content horizontally
        alignItems: 'center', // Centers content vertically
        flexDirection: 'column',
        position: 'relative', // Allows for positional adjustments
        top: '-90px', // Moves the container slightly upward
    },

    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '2rem',
        color: 'white',
    },
    scrollContainer: {
        maxHeight: '70vh',
        overflowY: 'scroll', // Enables vertical scrolling
        paddingRight: '10px',
        marginBottom: '20px',
    },
    fullScreenScrollable: {
        height: '100vh', // Makes it full-screen
        overflowY: 'scroll', // Allows scrolling anywhere on the screen
        padding: '0', // Optional: Remove padding for fullscreen effect
        margin: '0', // Optional: Remove margin for fullscreen effect
    },
    starCard: {
        
        border: '1px solid #bbb', // Reduced border color intensity
        borderRadius: '5px', // Reduced border radius
        marginBottom: '15px', // Reduced margin size
        padding: '10px', // Reduced padding
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)', // Reduced shadow intensity
        transition: 'all 0.3s ease-in-out', // Added transition for smooth hover effect
    },
    starCardHover: {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Hover effect shadow
        transform: 'scale(1.05)', // Slightly enlarge the card on hover
    },
    starName: {
        fontSize: '1.7rem',
        color: 'Blue',
        fontWeight: 'bold', // Added bold text for star name
        marginBottom: '10px', // Added margin for spacing
    },
    starImage: {
        width: '20%',
        maxHeight: '250px', // Reduced image size
        objectFit: 'cover',
        borderRadius: '5px', // Reduced border radius
        marginBottom: '15px',
        transition: 'transform 0.3s ease-in-out', // Added transition for hover effect
    },
    starImageHover: {
        transform: 'scale(1.1)', // Slightly enlarge the image on hover
    },
    button: {
        padding: '10px 20px', // Added button padding
        backgroundColor: '#6c63ff', // Button color
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease', // Smooth background color transition
    },
    buttonHover: {
        backgroundColor: '#5750e0', // Hover effect for button
    },
};


export default StarInfo;
