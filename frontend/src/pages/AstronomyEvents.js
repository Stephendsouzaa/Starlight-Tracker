import React, { useState, useEffect } from 'react';

function AstronomyEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // Filter by event type (e.g., 'meteor', 'eclipse', 'solar', etc.)
    const [sortedEvents, setSortedEvents] = useState([]);

    useEffect(() => {
        const fetchAstronomyEvents = async () => {
            try {
                const apiKey = 'h45eckHmCOuJrZOjV7P4ISbWz0dXCigPj2in0ZxP'; // Your NASA API Key
                const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch astronomy events');
                }

                const data = await response.json();
                const eventsData = [
                    {
                        date: '2024-12-14',
                        name: 'Geminid Meteor Shower',
                        description: 'One of the best meteor showers of the year, peaking on this date.',
                        type: 'Meteor Shower',
                        visibility: 'Visible across the Northern Hemisphere',
                        imageUrl: 'https://example.com/geminid-meteor-shower.jpg',
                        moreInfoUrl: 'https://example.com/geminid-more-info'
                    },
                    {
                        date: '2025-01-04',
                        name: 'Quadrantid Meteor Shower',
                        description: 'Peaks around January 4th and produces bright meteors.',
                        type: 'Meteor Shower',
                        visibility: 'Visible in parts of the Northern Hemisphere',
                        imageUrl: 'https://example.com/quadrantid-meteor-shower.jpg',
                        moreInfoUrl: 'https://example.com/quadrantid-more-info'
                    },
                    {
                        date: '2025-04-08',
                        name: 'Total Solar Eclipse',
                        description: 'A total solar eclipse visible across parts of the United States.',
                        type: 'Solar Eclipse',
                        visibility: 'Visible across North America',
                        imageUrl: 'https://example.com/total-solar-eclipse.jpg',
                        moreInfoUrl: 'https://example.com/total-solar-eclipse-info'
                    },
                    {
                        date: '2025-10-02',
                        name: 'Annular Solar Eclipse',
                        description: 'An annular solar eclipse visible across the Americas.',
                        type: 'Solar Eclipse',
                        visibility: 'Visible in parts of South America',
                        imageUrl: 'https://example.com/annular-solar-eclipse.jpg',
                        moreInfoUrl: 'https://example.com/annular-solar-eclipse-info'
                    },
                    {
                        date: '2025-08-12',
                        name: 'Perseid Meteor Shower',
                        description: 'Famous for bright meteors visible in the summer sky.',
                        type: 'Meteor Shower',
                        visibility: 'Visible across the Northern Hemisphere',
                        imageUrl: 'https://example.com/perseid-meteor-shower.jpg',
                        moreInfoUrl: 'https://example.com/perseid-more-info'
                    },
                ];

                setEvents(eventsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAstronomyEvents();
    }, []);

    useEffect(() => {
        // Filter events based on type
        if (filter === 'all') {
            setSortedEvents(events);
        } else {
            setSortedEvents(events.filter(event => event.type.toLowerCase() === filter.toLowerCase()));
        }
    }, [filter, events]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    if (loading) {
        return <p>Loading astronomy events...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Astronomy Events Calendar</h2>

           

            <div style={styles.scrollContainer}>
                {sortedEvents.length > 0 ? (
                    sortedEvents.map((event, index) => (
                        <div key={index} style={styles.eventCard}>
                            <h3 style={styles.eventName}>{event.name}</h3>
                            <p style={styles.eventDate}>{event.date}</p>
                            <p>{event.description}</p>
                            <p><strong>Visibility:</strong> {event.visibility}</p>
                            {event.imageUrl && <img src={event.imageUrl} alt={event.name} style={styles.eventImage} />}
                            <a href={event.moreInfoUrl} target="_blank" rel="noopener noreferrer" style={styles.moreInfoLink}>More Info</a>
                        </div>
                    ))
                ) : (
                    <p>No astronomy events available</p>
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
    filterContainer: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    filterLabel: {
        color: '#fff',
        fontSize: '1.2rem',
    },
    filterSelect: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        marginTop: '10px',
    },
    scrollContainer: {
        maxHeight: '70vh',
        overflowY: 'scroll',
        paddingRight: '10px',
        marginBottom: '20px',
    },
    eventCard: {
        border: '1px solid #bbb',
        borderRadius: '5px',
        marginBottom: '15px',
        padding: '10px',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
    },
    eventName: {
        fontSize: '1.7rem',
        color: '#ff6347', // Tomato red for event name
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    eventDate: {
        fontSize: '1.2rem',
        color: '#555',
        marginBottom: '10px',
    },
    eventImage: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    moreInfoLink: {
        color: '#4CAF50',
        fontSize: '1rem',
        textDecoration: 'none',
        display: 'inline-block',
        marginTop: '10px',
    },
};

export default AstronomyEvents;
