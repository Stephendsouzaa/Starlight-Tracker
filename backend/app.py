from flask import Flask
from flask_cors import CORS  # Import CORS
from app import create_app  # Import your create_app function

app = create_app()  # Initialize your Flask app
CORS(app)  # Enable CORS for the app

if __name__ == "__main__":
    app.run(debug=True)  # Start the app with debug mode
