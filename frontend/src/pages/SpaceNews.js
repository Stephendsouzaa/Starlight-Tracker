import React, { useState, useEffect } from 'react';

function SpaceNews() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpaceNews = async () => {
            try {
                const apiKey = 'h45eckHmCOuJrZOjV7P4ISbWz0dXCigPj2in0ZxP'; // Your NASA API Key
                // URL to fetch news. We're using APOD (Astronomy Picture of the Day) for this example.
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=5`);

                if (!response.ok) {
                    throw new Error('Failed to fetch space news');
                }

                const data = await response.json();
                setNewsData(data); // Store the news data including images
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSpaceNews();
    }, []);

    if (loading) {
        return <p>Loading space news...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Latest Space News</h2>
            <div style={styles.scrollContainer}>
                {newsData.length > 0 ? (
                    newsData.map((news, index) => (
                        <div key={index} style={styles.newsCard}>
                            <h3 style={styles.newsTitle}>{news.title}</h3>
                            <img src={news.url} alt={news.title} style={styles.newsImage} />
                            <p><strong>Date:</strong> {news.date}</p>
                            <p>{news.explanation}</p>
                            <a href={news.hdurl} target="_blank" rel="noopener noreferrer" style={styles.link}>View HD Image</a>
                        </div>
                    ))
                ) : (
                    <p>No space news available</p>
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
    newsCard: {
        border: '1px solid #bbb',
        borderRadius: '5px',
        marginBottom: '15px',
        padding: '10px',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
    },
    newsTitle: {
        fontSize: '1.7rem',
        color: 'Blue',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    newsImage: {
        width: '75%',
        maxHeight: '2550px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginBottom: '15px',
    },
    link: {
        color: '#0077cc',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default SpaceNews;
