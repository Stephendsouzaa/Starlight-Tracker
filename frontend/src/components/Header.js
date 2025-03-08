import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from './Chatbot'; // Import the Chatbot component
import './Header.css'; // Import your CSS for Header
import Login from '../pages/Login'; // Correct path for Login component

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [showOptions, setShowOptions] = useState(false); // Track if profile options should be displayed
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Track chatbot visibility
  const [showAllLinks, setShowAllLinks] = useState(true); // Initially, show all links
  const [showButtons, setShowButtons] = useState(true); // Initially, show all buttons

  // Effect to check the login status when the component mounts
  useEffect(() => {
    const user = localStorage.getItem('user'); // Check localStorage for the user data
    if (user) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Log out the user and remove the user from localStorage
      localStorage.removeItem('user');
      setIsLoggedIn(false); // Update the login status
    }
    setShowOptions(false); // Hide options after logging out
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions); // Show or hide options when Profile button is clicked
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen); // Toggle chatbot visibility
  };

  const handleAccess = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation if not logged in
      alert('Please log in to access this section');
    }
  };

  const handleLoginSuccess = (user) => {
    // On successful login, store user data and update login state
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    setShowOptions(false); // Close the profile options dropdown
  };

  const toggleLinksVisibility = () => {
    setShowAllLinks(!showAllLinks); // Toggle the visibility of all links
    setShowButtons(true); // Ensure buttons are visible when toggling links
  };

  const handleButtonClick = () => {
    setShowButtons(false); // Hide buttons after any one is clicked
  };

  return (
    <header className="header">
      <h1 className="header-title">Starlight Tracker</h1>
      <div className="scroll-container"> {/* Scrollable container */ }
        <nav className="nav">
          <Link className="nav-link" to="/">Home</Link>

          {/* Button to toggle all links */}
          <button 
            onClick={toggleLinksVisibility} 
            className="toggle-links-btn"
            style={{
              padding: '5px 15px',  // Reduce padding for a smaller button
              cursor: 'pointer',
              position: 'fixed',     // Fixed position to keep it on the screen
              top: '70px',           // Place it at the top
              left: '77px',          // Place it on the left
              zIndex: 1000,          // Ensure it stays on top of other elements
              color: 'white',        // Text color white for contrast
              border: '2px solid #ddd', // Border around the box
              borderRadius: '5px',   // Rounded corners
              boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', // Subtle shadow effect
              fontWeight: 'bold',    // Bold text for emphasis
              width: '5%',         // Let the width adjust to content
              height: '30px',        // Set a fixed height
              textAlign: 'center',   // Center align the text
              lineHeight: '20px',     // Ensure it stays on top of other elements
            }}
          >
            {showAllLinks ? '🔽' : '▲'}
          </button>

          {/* Show all the buttons only if showAllLinks is true */}
          {showAllLinks && showButtons && (
            <>
              <Link className="nav-link" to="/star-info" onClick={(e) => { handleAccess(e); handleButtonClick(); }}>Star Info</Link>
              <Link className="nav-link" to="/constellation-info" onClick={(e) => { handleAccess(e); handleButtonClick(); }}>Constellation Info</Link>
              <a href="https://starlighttracker-uplaod-capture.onrender.com/" 
   target="_blank" 
   rel="noopener noreferrer" 
   className="nav-link upload-link" 
   onClick={(e) => { handleAccess(e); handleButtonClick(); }}>
   Upload / Capture
</a>

              <Link className="nav-link" to="/space-news" onClick={(e) => { handleAccess(e); handleButtonClick(); }}>Latest Space News</Link>
              <a href="/feedback" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={(e) => { handleAccess(e); handleButtonClick(); }}>Feedback</a>
              <Link className="nav-link" to="/planetary-info" onClick={(e) => { handleAccess(e); handleButtonClick(); }}>Planetary Info</Link>
              <Link className="nav-link" to="/astronomy-events" onClick={(e) => { handleAccess(e); handleButtonClick(); }}>Astronomy Events</Link>
              <Link className="nav-link" to="/space-facts" onClick={(e) => { handleAccess(e); handleButtonClick(); }}>Space Facts</Link>
            </>
          )}

          {/* Profile Button */}
          <div style={{ position: 'absolute', top: '0px', right: '10px', display: 'inline-block' }}>
            <button
              onClick={toggleOptions}
              style={{
                padding: '10px',
                cursor: 'pointer',
                top: '-100px',
                right: 127,
                position: 'relative',
                zIndex: 1000, // Ensure the button stays on top
              }}
            >
              Profile
            </button>

            {/* Dropdown options */}
            {showOptions && (
              <div
                style={{
                  position: 'absolute',
                  top: '20px',  // Dropdown appears 40px below the profile button
                  right: '100px',
                  backgroundColor: '',
                  border: '3px solid #ccc',
                  borderRadius: '4px',
                  zIndex: 1000,
                  padding: '10px 100px',
                  backgroundColor: '',
                  textAlign: 'center',
                }}
              >
                {!isLoggedIn ? (
                  <Login onLogin={handleLoginSuccess} /> // Pass function to set isLoggedIn to true
                ) : (
                  <button
                    onClick={handleLoginLogout}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Floating Chatbot Button */}
      <div className="chatbot-button-container">
        <button onClick={toggleChatbot} className="chatbot-toggle-btn">
          <img id="chatbot-logo" src="chartbot77.gif" alt="Chatbot" />
        </button>
      </div>

      {/* Chatbot Component */}
      {isChatbotOpen && <Chatbot />}
    </header>
  );
}

export default Header;
