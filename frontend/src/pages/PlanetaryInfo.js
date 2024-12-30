import React, { useState, useEffect } from 'react';
import Mercury from './Mercury.jpg';
import Venus from './Venus.jpg';
import Earth from './Earth.jpg';
import Mars from './Mars.jpg';
import Jupiter from './Jupiter.jpg';
import Saturn from './Saturn.jpg';
import Uranus from './Uranus.jpg';
import Neptune from './Neptune.jpg';

function PlanetaryInfo() {
    const [planetData, setPlanetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanetData = async () => {
            try {
                const planets = [
                    {
                        name: 'Mercury',
                        distanceFromSun: '57.9 million km',
                        mass: '0.330 × 10^24 kg',
                        diameter: '4,880 km',
                        moons: 'None',
                        imageUrl: Mercury,
                        description: 'Mercury is the closest planet to the Sun and has extreme temperature variations.'
                    },
                    {
                        name: 'Venus',
                        distanceFromSun: '108.2 million km',
                        mass: '4.87 × 10^24 kg',
                        diameter: '12,104 km',
                        moons: 'None',
                        imageUrl: Venus,
                        description: 'Venus has a thick atmosphere, causing it to have the hottest surface temperature in the solar system.'
                    },
                    {
                        name: 'Earth',
                        distanceFromSun: '149.6 million km',
                        mass: '5.97 × 10^24 kg',
                        diameter: '12,742 km',
                        moons: '1 (Moon)',
                        imageUrl: Earth,
                        description: 'Earth is the only known planet to support life, with vast oceans and a breathable atmosphere.'
                    },
                    {
                        name: 'Mars',
                        distanceFromSun: '227.9 million km',
                        mass: '0.642 × 10^24 kg',
                        diameter: '6,779 km',
                        moons: '2 (Phobos, Deimos)',
                        imageUrl: Mars,
                        description: 'Mars, known as the Red Planet, has the largest volcano and canyon in the solar system.'
                    },
                    {
                        name: 'Jupiter',
                        distanceFromSun: '778.5 million km',
                        mass: '1.90 × 10^27 kg',
                        diameter: '139,820 km',
                        moons: '79+ (Including Ganymede, the largest moon in the solar system)',
                        imageUrl: Jupiter,
                        description: 'Jupiter is the largest planet in our solar system, known for its Great Red Spot storm.'
                    },
                    {
                        name: 'Saturn',
                        distanceFromSun: '1.43 billion km',
                        mass: '5.68 × 10^26 kg',
                        diameter: '116,460 km',
                        moons: '82 (Including Titan)',
                        imageUrl: Saturn,
                        description: 'Saturn is famous for its beautiful ring system and is the second-largest planet in our solar system.'
                    },
                    {
                        name: 'Uranus',
                        distanceFromSun: '2.87 billion km',
                        mass: '8.68 × 10^25 kg',
                        diameter: '50,724 km',
                        moons: '27',
                        imageUrl: Uranus,
                        description: 'Uranus has a unique tilted axis and is known for its blue-green color due to methane in its atmosphere.'
                    },
                    {
                        name: 'Neptune',
                        distanceFromSun: '4.50 billion km',
                        mass: '1.02 × 10^26 kg',
                        diameter: '49,244 km',
                        moons: '14 (Including Triton)',
                        imageUrl: Neptune,
                        description: 'Neptune is known for its deep blue color and strong winds, being the farthest planet from the Sun.'
                    },
                ];

                setPlanetData(planets);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPlanetData();
    }, []);

    if (loading) {
        return <p>Loading planetary information...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Planetary Information</h2>
            {planetData.length > 0 ? (
                planetData.map((planet, index) => (
                    <div key={index} style={styles.planetCard}>
                        <img src={planet.imageUrl} alt={planet.name} style={styles.planetImage} />
                        <div style={styles.planetInfo}>
                            <h3 style={styles.planetName}>{planet.name}</h3>
                            <p style={styles.planetDescription}>{planet.description}</p>
                            <p style={styles.planetDetails}>Distance from Sun: {planet.distanceFromSun}</p>
                            <p style={styles.planetDetails}>Mass: {planet.mass}</p>
                            <p style={styles.planetDetails}>Diameter: {planet.diameter}</p>
                            <p style={styles.planetDetails}>Moons: {planet.moons}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No planet data available</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxHeight: '100vh',
        overflowY: 'auto',
        padding: '50px', // Reduced padding to allow space for content at the top
        width: '57%', // Slightly wider to accommodate larger content
        borderRadius: '10px',
        margin: '0 auto', // Centers horizontally
        display: 'flex', // Enables flexbox for centering
        justifyContent: 'flex-start', // Aligns content at the top
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative', // Allows for positional adjustments
        top: '0', // Remove the upward shift to ensure the content stays in place
         // Adds a darker background for a space feel
    },

    header: {
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2.5rem', // Increased font size for emphasis
        color: 'white',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)', // Adds a subtle glow effect to the text
        position: 'relative', // Remove any fixed positioning to keep header visible
    },

    scrollContainer: {
        maxHeight: '70vh',
        overflowY: 'scroll', // Enables vertical scrolling
        paddingRight: '10px',
        marginBottom: '30px',
        width: '100%', // Ensure scroll container takes up full width
    },

    fullScreenScrollable: {
        height: '100vh', // Fullscreen scrolling
        overflowY: 'scroll',
        padding: '0',
        margin: '0',
    },

    planetCard: {
        border: '3px solid white', // Darker border for a space look
        borderRadius: '10px', // Rounded corners for a sleek look
        marginBottom: '20px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
         // Semi-transparent background for celestial effect
        transition: 'all 0.3s ease-in-out', // Smooth transition for hover effect
        width: '100%', // Ensure cards take full width of container
    },

    planetCardHover: {
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
        transform: 'scale(1.05)', // Slightly enlarge the card on hover
    },

    planetName: {
        fontSize: '2rem', // Increased font size for planetary names
        color: '#ffcc00', // Golden color to make it stand out
        fontWeight: 'bold',
        marginBottom: '15px',
    },

    planetImage: {
        width: '30%', // Adjusted to fit better in the layout
        maxHeight: '300px',
        objectFit: 'cover',
        borderRadius: '50%', // Circle shape for a planet image
        marginBottom: '20px',
        transition: 'transform 0.3s ease-in-out', // Transition effect for image hover
    },

    planetImageHover: {
        transform: 'scale(1.1)', // Slightly enlarge the image on hover
    },

    button: {
        padding: '12px 25px',
        backgroundColor: '#6c63ff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.2rem', // Slightly larger text for the button
        transition: 'background-color 0.3s ease',
        marginTop: '20px',
    },

    buttonHover: {
        backgroundColor: '#5750e0', // Darker button color on hover
    },
};



export default PlanetaryInfo;
