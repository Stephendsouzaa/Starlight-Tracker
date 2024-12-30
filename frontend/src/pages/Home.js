import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter"; // Import the library
import "./Home.css"; // Ensure this file exists and contains your styles

function Home() {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const fetchStars = async () => {
            try {
                const response = await axios.get("/api/stars");
                setStars(response.data);
            } catch (err) {
                console.error("Error fetching stars:", err);
            }
        };
        fetchStars();
    }, []);

    return (
        <div className="home">
            <h2>Welcome to Starlight Tracker</h2>
            <div className="typing-effect">
                <Typewriter
                    words={[
                        "Discover the galaxy's most famous stars.",
                        "Track your favorite celestial beings.",
                        "Experience the wonders of the cosmos!"
                    ]}
                    loop={Infinity}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </div>
            
            <ul>
                {stars.map(star => (
                    <li key={star.id}>{star.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
