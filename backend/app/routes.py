from flask import Blueprint, jsonify, request
import openai
import os

# Create a Blueprint for the chatbot
chatbot_blueprint = Blueprint('chatbot', __name__)

# OpenAI API Key (Ensure to add this key in your .env file or environment variables)
openai.api_key = os.getenv('OPENAI_API_KEY')

@chatbot_blueprint.route('/api/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json.get("message")
    
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Call the OpenAI API
        response = openai.Completion.create(
            engine="text-davinci-003",  # or any other engine you want to use
            prompt=user_message,
            max_tokens=100,
            temperature=0.5
        )
        
        bot_message = response.choices[0].text.strip()
        
        return jsonify({"bot_message": bot_message})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Create a Blueprint for the main application routes
main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to Starlight Tracker!"})

@main.route('/api/data')
def get_data():
    # Example data
    data = {
        "stars": [
            {"name": "Sirius", "type": "Main Sequence"},
            {"name": "Canopus", "type": "Supergiant"},
            {"name": "Arcturus", "type": "Giant"},
            {"name": "Alpha Centauri", "type": "Triple Star System"}
        ]
    }
    return jsonify(data)

@main.route('/api/about')
def about():
    about_info = {
        "app_name": "Starlight Tracker",
        "version": "1.0",
        "description": "An application to track and learn about various stars."
    }
    return jsonify(about_info)
