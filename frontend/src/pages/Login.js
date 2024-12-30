import React, { useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from './firebase'; // Ensure the Firebase setup is correct

function Login() {
  const [user, setUser] = useState(null); // Store the logged-in user
  const [loading, setLoading] = useState(false); // Track loading state

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Automatically log in if user is already authenticated
        localStorage.setItem('user', JSON.stringify(currentUser)); // Store in localStorage
      } else {
        setUser(null); // Reset user when logged out
        localStorage.removeItem('user'); // Remove from localStorage
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Handle Google Login
  const handleLogin = async () => {
    if (user) {
      console.log('User is already logged in.');
      return; // Don't login again if user is already authenticated
    }

    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser); // Update user state
      localStorage.setItem('user', JSON.stringify(loggedInUser)); // Store user in localStorage
      console.log('User logged in:', loggedInUser);
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      alert('Failed to sign in. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Reset user state on logout
      localStorage.removeItem('user'); // Remove user from localStorage
      console.log('User logged out.');
    } catch (error) {
      console.error('Error during logout:', error.message);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {user ? (
        <div>
          <img
            src={user.photoURL}
            alt="Profile"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '50%',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
          />
          <h3 style={{ marginTop: '100px', backgroundColor: 'black', color: 'white' }}>
            Welcome, {user.displayName}
          </h3>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              top: '45px',
              right: '170px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            top: '60px',
            right: '170px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {loading ? 'Signing In...' : 'Sign in with Google'}
        </button>
      )}
    </div>
  );
}

export default Login;
