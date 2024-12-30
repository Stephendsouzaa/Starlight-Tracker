import React, { useState, useEffect } from 'react';
import OrionImage from './Orion.png';            // if OrionImage is a .png
import PiscesiImage from './Pisces.png';          // if PiscesImage is a .png
import CanisMajoriImage from './CanisMajor.png';  // if CanisMajoriImage is a .png
import CapricornusiImage from './Capricornus.png'; // if CapricornusiImage is a .png

 
function ConstellationInfo() {
    const [constellations, setConstellations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConstellations = async () => {
            try {
                const apiKey = 'h45eckHmCOuJrZOjV7P4ISbWz0dXCigPj2in0ZxP'; // Your NASA API Key
                // Replace with a constellation-related API when available
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch constellation data');
                }

                const data = await response.json();

                // Mock data for demonstration purposes
                setConstellations([
                    {
                        name: "Orion",
                        imageUrl: OrionImage,
                        description: "Orion is one of the most recognizable constellations in the night sky. It is named after Orion, a hunter in Greek mythology.",
                        brightestStar: "Rigel",
                    },
                    {
                        name: "Ursa Major",
                        imageUrl: PiscesiImage,
                        description: "Ursa Major, also known as the Great Bear, contains the Big Dipper asterism. It is one of the largest constellations.",
                        brightestStar: "Dubhe",
                    },
                    {
                        name: "Cassiopeia",
                        imageUrl: CanisMajoriImage,
                        description: "Cassiopeia is a distinctive 'W'-shaped constellation in the northern sky, named after a queen in Greek mythology.",
                        brightestStar: "Schedar",
                    },
                    {
                        name: "Cygnus",
                        imageUrl: CapricornusiImage,
                        description: "Cygnus, the Swan, is a constellation in the Milky Way. It contains the famous star Deneb, part of the Summer Triangle.",
                        brightestStar: "Deneb",
                    },
                ]);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchConstellations();
    }, []);

    if (loading) {
        return <p>Loading constellation information...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Constellation Information</h2>
            <div style={styles.scrollContainer}>
                {constellations.length > 0 ? (
                    constellations.map((constellation, index) => (
                        <div key={index} style={styles.card}>
                            <h3 style={styles.name}>{constellation.name}</h3>
                            <img
                                src={constellation.imageUrl}
                                alt={constellation.name}
                                style={styles.image}
                            />
                            <p><strong>Description:</strong> {constellation.description}</p>
                            <p><strong>Brightest Star:</strong> {constellation.brightestStar}</p>
                        </div>
                    ))
                ) : (
                    <p>No constellation information available.</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxHeight: '100vh',
        overflowY: 'auto',
        padding: '50px',
        width: '57%',
        borderRadius: '5px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        top: '-50px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '2.5rem',
        color: 'white',
        fontWeight: 'bold',
    },
    scrollContainer: {
        maxHeight: '70vh',
        overflowY: 'scroll',
        paddingRight: '10px',
        marginBottom: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '20px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
    },
    name: {
        fontSize: '1.8rem',
        color: '#0073e6',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    image: {
        width: '50%',
        maxHeight: '300px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '15px',
        border: '2px solid white',
    },
};

export default ConstellationInfo;
