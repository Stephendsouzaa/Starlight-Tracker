from flask import Flask 
from .config import Config  # Import the configuration class
from app.routes import main, chatbot_blueprint  # Import the main and chatbot blueprints

def create_app():
    # Create a Flask application instance
    app = Flask(__name__)
    
    # Load configuration from the Config class
    app.config.from_object(Config)

    # Register the chatbot blueprint
    app.register_blueprint(chatbot_blueprint)

    # Register the main blueprint
    app.register_blueprint(main)

    return app
