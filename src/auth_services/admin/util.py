import os
import datetime
import hashlib
import secrets
from flask import request, jsonify
import mysql.connector
from dotenv import load_dotenv
from storage import util as storage_util

load_dotenv()  # Load environment variables from .env file

# database config
db_config = {
    "host": os.environ.get("MYSQL_HOST"),
    "user": os.environ.get("MYSQL_USER"),
    "password": os.environ.get("MYSQL_PASSWORD"),
    "database": os.environ.get("MYSQL_DB")
}

jwt_secret = os.environ.get("JWT_SECRET")
access_code = os.environ.get("ADMIN_ACCESS_CODE")


def register(request):
    data = request.json
    email = data.get('email')
    password = data.get('password')
    admin_access_code = data.get('admin_access_code')

    if not email or not password:
        return jsonify({"message": "Username and password are required."}), 400

    if admin_access_code != access_code:
        return jsonify({"message": "Access Denied"}), 403

    # Check if the email is already taken
    try:
        conn = mysql.connector.connect(**db_config)
    # Rest of your database-related code
    except mysql.connector.Error as e:
        return ("Error connecting to the database:", e)

    cursor = conn.cursor()

    query = "SELECT COUNT(*) FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    if result > 0:
        return jsonify({"message": "Username already exists. Please choose a different username."}), 409

    # Create a new user and store in the database
    response = storage_util.create_user(data)

    return jsonify(response), 201


def login(request):
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

    if user[2] != 1:
        return jsonify({"message": "Admin Status Required."}), 403

    if user[13] != 1:
        return jsonify({"message": "User account is not active."}), 403

    stored_hashed_password = user[1]  # Assuming password is stored at index 1
    input_hashed_password = hashlib.sha256(password.encode()).hexdigest()

    if stored_hashed_password == input_hashed_password:
        token = storage_util.createJWT(email, jwt_secret, user[2])

        user_info = {
            "id": user[0],
            "password": user[1],
            "is_admin": user[2],
            "phone_number": user[3],
            "street_address": user[4],
            "city": user[5],
            "state": user[6],
            "zip_code": user[7],
            "email": user[8],
            "latitude": user[9],
            "longitude": user[10],
            "first_name": user[11],
            "last_name": user[12],
            "token": token
        }

        return jsonify(user_info), 200
    else:
        return jsonify({"message": "Incorrect password. Please check your credentials."}), 401


def me(request):
    email, status_code = storage_util.validate(request)

    if status_code != 200:
        return email, status_code

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user[13] != 1:
            return jsonify({"message": "Admin Status Required"}), 403

        if not user:
            return jsonify({"message": "User not found."}), 404

        user_info = {
            "id": user[0],
            "password": user[1],
            "is_admin": user[2],
            "phone_number": user[3],
            "street_address": user[4],
            "city": user[5],
            "state": user[6],
            "zip_code": user[7],
            "email": user[8],
            "latitude": user[9],
            "longitude": user[10],
            "first_name": user[11],
            "last_name": user[12],
        }

        return jsonify(user_info), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Error retrieving user."}), 500


def get_users():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "SELECT * FROM users WHERE active = 1 AND is_admin = 0"
        cursor.execute(query)
        active_users = cursor.fetchall()

        cursor.close()
        conn.close()

        user_objects = []

        for user in active_users:
            user_object = {
                "id": user[0],
                "password": user[1],
                "is_admin": user[2],
                "phone_number": user[3],
                "street_address": user[4],
                "city": user[5],
                "state": user[6],
                "zip_code": user[7],
                "email": user[8],
                "latitude": user[9],
                "longitude": user[10],
                "first_name": user[11],
                "last_name": user[12],
            }

            user_objects.append(user_object)

        return jsonify(user_objects), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "Error retrieving user."}), 500
