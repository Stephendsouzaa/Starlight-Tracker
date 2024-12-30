import React, { useState, useEffect } from 'react';

function SpaceFacts() {
    const [spaceFacts, setSpaceFacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpaceFacts = async () => {
            try {
                const apiKey = 'h45eckHmCOuJrZOjV7P4ISbWz0dXCigPj2in0ZxP'; // Your NASA API Key
                // Placeholder URL: Fetch space facts data or simulation
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=5`);

                if (!response.ok) {
                    throw new Error('Failed to fetch space facts');
                }

                const data = await response.json();
                setSpaceFacts(data); // Store the space facts
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSpaceFacts();
    }, []);

    if (loading) {
        return <p>Loading space facts...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Space Facts</h2>
            <div style={styles.scrollContainer}>
                {spaceFacts.length > 0 ? (
                    spaceFacts.map((fact, index) => (
                        <div key={index} style={styles.factCard}>
                            <h3 style={styles.factTitle}>{fact.title}</h3>
                            <img src={fact.url} alt={fact.title} style={styles.factImage} />
                            <p>{fact.explanation}</p>
                        </div>
                    ))
                ) : (
                    <p>No space facts available</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxHeight: '100vh',
        overflowY: 'auto',
        padding: '20px',
        width: '57%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '2rem',
        color: '#fff',
    },
    scrollContainer: {
        maxHeight: '70vh',
        overflowY: 'scroll',
        paddingRight: '10px',
        marginBottom: '20px',
    },
    factCard: {
        border: '1px solid #bbb',
        borderRadius: '5px',
        marginBottom: '15px',
        padding: '10px',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
    },
    factTitle: {
        fontSize: '1.7rem',
        color: 'Blue',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    factImage: {
        width: '75%',
        maxHeight: '1050px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginBottom: '15px',
    },
};

export default SpaceFacts;
