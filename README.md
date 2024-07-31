This project is a simple chat application built using Flask, fine-tuned GPT-2 for AI responses, and MariaDB as the backend database. It includes functionalities for user registration, login, and a protected chat page. The application is designed to demonstrate the integration of a machine learning model within a web application framework.

**Features**
1. User Registration and Login
2. Protected chat page
3. AI-powered responses using GPT-2
4. MariaDB as the backend database

**Prerequisites**
1. Python 3.7+
2. Flask
3. Flask-WTF
4. Flask-Login
5. Flask-SQLAlchemy
6. transformers
7. torch
8. MariaDB or MySQL


**Installation Instructions**
1. Setup a linux server. We recommend ubuntu or any debian based distro.
2. clone the repository
<br>```git clone https://github.com/naidyyaswanthreddy/CodeBlue.git```
<br>```cd flask-chat-app```
3. Setup a virtual environment
<br>```python3 -m venv venv```
<br>```source venv/bin/activate```
4. Install Dependencies
<br>```pip install flask flask-wtf flask-login transformers torch pymysql datasets```
5. run the chatbot.py ```python3 -m chatbot.py```
