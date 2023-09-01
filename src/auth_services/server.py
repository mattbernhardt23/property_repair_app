import jwt
import os
import datetime
import hashlib
import secrets
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import mysql.connector
from dotenv import load_dotenv
from storage import util
from flask_cors import CORS

app = Flask(__name__)


load_dotenv()  # Load environment variables from .env file

server = Flask(__name__)
api = Api(server)
# Allow requests from this origin
CORS(server, origins='http://localhost:3000')


# config
db_config = {
    "host": os.environ.get("MYSQL_HOST"),
    "user": os.environ.get("MYSQL_USER"),
    "password": os.environ.get("MYSQL_PASSWORD"),
    "database": os.environ.get("MYSQL_DB")
}

jwt_secret = os.environ.get("JWT_SECRET")


@server.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Username and password are required."}), 400

    # Check if the username is already taken
    try:
        conn = mysql.connector.connect(**db_config)
    # Rest of your database-related code
    except mysql.connector.Error as e:
        return ("Error connecting to the database:", e)

    cursor = conn.cursor()

    query = "SELECT COUNT(*) FROM users WHERE username = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    if result > 0:
        return jsonify({"message": "Username already exists. Please choose a different username."}), 409

    # Create a new user and store in the database
    response = util.create_user(data)

    return jsonify(response), 201


@server.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Username and password are required."}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        # Rest of your database-related code
    except mysql.connector.Error as e:
        return jsonify({"message": "Error connecting to the database.", "error": str(e)}), 500

    cursor = conn.cursor()

    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({"message": "User not found. Please check your credentials."}), 404

    stored_hashed_password = user[2]  # Assuming password is stored at index 1
    input_hashed_password = hashlib.sha256(password.encode()).hexdigest()

    if stored_hashed_password == input_hashed_password:
        token = util.createJWT(email, jwt_secret, user[2])

        user_info = {
            "id": user[0],
            "username": user[1],
            "password": user[2],
            "is_admin": user[3],
            "phone_number": user[4],
            "street_address": user[5],
            "city": user[6],
            "state": user[7],
            "zip_code": user[8],
            "email": user[9],
            "latitude": user[10],
            "longitude": user[11],
            "token": token
        }

        return jsonify(user_info), 200
    else:
        return jsonify({"message": "Incorrect password. Please check your credentials."}), 401


@server.route("/me", methods=["POST"])
def get_me():
    email, status_code = util.validate(request)

    if status_code != 200:
        return email

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if not user:
            return jsonify({"message": "User not found."}), 404

        user_info = {
            "id": user[0],
            "username": user[1],
            "password": user[2],
            "is_admin": user[3],
            "phone_number": user[4],
            "street_address": user[5],
            "city": user[6],
            "state": user[7],
            "zip_code": user[8],
            "email": user[9],
            "latitude": user[10],
            "longitude": user[11]
        }

        return jsonify(user_info), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Error retrieving user."}), 500


if __name__ == "__main__":
    server.run(host="0.0.0.0", port=5000)
