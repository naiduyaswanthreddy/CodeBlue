# Tech HelpDesk

This project is a simple chat application built using Flask, fine-tuned GPT-2 for AI responses, and MariaDB as the backend database. It includes functionalities for user registration, login, and a protected chat page, designed to demonstrate the integration of a machine learning model within a web application framework.

## Features

1. **User Registration and Login**: Secure user management system.
2. **Protected Chat Page**: Access restricted to logged-in users.
3. **AI-Powered Responses**: GPT-2 model for generating conversational replies.
4. **MariaDB Backend**: Uses MariaDB for database management.

## Prerequisites

- Python 3.7+
- Flask
- Flask-WTF
- Flask-Login
- Flask-SQLAlchemy
- `transformers`
- `torch`
- MariaDB or MySQL

## Installation Instructions

1. **Set up a Linux server**: We recommend Ubuntu or any Debian-based distribution.

2. **Clone the repository**:
   ```bash
   git clone https://github.com/naidyyaswanthreddy/CodeBlue.git
   cd flask-chat-app
  
3. **Set up a virtual environment:**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
4. **Install dependencies:**:
   ```bash
   pip install flask flask-wtf flask-login transformers torch pymysql datasets
5. **Set up a virtual environment:**:
   ```bash
   python3 chatbot.py

## Configuration

Ensure you have MariaDB or MySQL installed and properly configured. Update your database connection settings in the application configuration files if necessary.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
