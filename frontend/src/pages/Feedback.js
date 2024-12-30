import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import './Feedback.css';

// Initialize Firestore
const db = getFirestore(); // Ensure Firestore is initialized

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Bug');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [recommend, setRecommend] = useState(null); // For survey question
  const [file, setFile] = useState(null); // For attachments (optional)

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError(''); // Clear previous errors
    setSuccess(false); // Reset success state

    try {
      console.log('Submitting feedback:', feedback); // Log feedback to check

      // Firestore Reference for 'feedbacks' collection
      const feedbackDocRef = doc(db, 'feedbacks', 'feedback_' + new Date().getTime()); // Custom document ID based on timestamp
      await setDoc(feedbackDocRef, {
        name,
        email,
        feedback,
        category,
        rating,
        recommend,
        file, // Store attachment (if any)
        timestamp: new Date(), // Store the submission timestamp
      });

      console.log('Feedback submitted successfully');
      setFeedback(''); // Clear the feedback field after submission
      setName('');
      setEmail('');
      setCategory('Bug');
      setRating(0);
      setRecommend(null);
      setFile(null);
      setSuccess(true); // Set success state to true
    } catch (err) {
      console.error('Error submitting feedback:', err); // Log error for debugging
      if (err.message) {
        setError('Failed to submit feedback: ' + err.message);
      } else {
        setError('Failed to submit feedback. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFile(file); // Set the file state
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="title">Starlight Tracker - Feedback</h2>
      <p className="intro-text">
        Your feedback is extremely valuable to us. We are committed to making Starlight Tracker better, and your suggestions, ideas, or bug reports help us improve the experience for all users. Please take a moment to share your thoughts and let us know how we can make your experience even better!
      </p>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Thank you for your feedback! 🌟 I will check that soon 😊 </p>}
      <div className="scrollable-form">
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              <option value="Bug">Bug</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Improvement">Improvement</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback here..."
              className="feedback-textarea"
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label>
              Rate your experience:
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="rating-input"
                min="0"
                max="5"
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Would you recommend this app?
              <div>
                <input
                  type="radio"
                  value="yes"
                  name="recommend"
                  onChange={(e) => setRecommend(e.target.value)}
                />{' '}
                Yes
                <input
                  type="radio"
                  value="no"
                  name="recommend"
                  onChange={(e) => setRecommend(e.target.value)}
                />{' '}
                No
              </div>
            </label>
          </div>
          <div className="input-group">
            <label>
              Attach a file (optional):
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
              />
            </label>
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
