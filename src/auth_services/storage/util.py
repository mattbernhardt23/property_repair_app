import jwt
import os
import datetime
import hashlib
import secrets
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import mysql.connector
import googlemaps
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

server = Flask(__name__)
api = Api(server)

# config
db_config = {
    "host": os.environ.get("MYSQL_HOST"),
    "user": os.environ.get("MYSQL_USER"),
    "password": os.environ.get("MYSQL_PASSWORD"),
    "database": os.environ.get("MYSQL_DB")
}

api_key = os.environ.get("GOOGLE_API_KEY")
jwt_secret = os.environ.get("JWT_SECRET")

# Get User Home Location


def get_location(address):
    # Create a Google Maps client
    gmaps = googlemaps.Client(key=api_key)

    # Geocode an address
    geocode_result = gmaps.geocode(address)

    if geocode_result:
        location = geocode_result[0]['geometry']['location']
        latitude = location['lat']
        longitude = location['lng']

        return latitude, longitude
    else:
        print("No geocoding results found.")


# Helper function to create user


def create_user(data):
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    password = data.get("password")
    is_admin = int(data.get("is_admin", 0))
    email = data.get("email")
    phone_number = data.get("phone_number")
    street_address = data.get("street_address")
    city = data.get("city")
    state = data.get("state")
    zip_code = data.get("zip_code")
    active = True

    # Get Geo-Location of Project Address
    full_address = street_address + '' + city + ',' + state
    geo_locate = get_location(full_address)
    latitude = geo_locate[0]
    longitude = geo_locate[1]

    token = createJWT(email, jwt_secret, is_admin)

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        # Hash the password before storing it in the database
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        # Insert user information into the database
        query = "INSERT INTO users (first_name, last_name, password, is_admin, phone_number, street_address, city, state, zip_code, email, latitude, longitude, active) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (first_name, last_name, hashed_password, is_admin, phone_number,
                  street_address, city, state, zip_code, email, latitude, longitude, active)
        cursor.execute(query, values)

        conn.commit()
        cursor.close()
        conn.close()

        user_info = {
            "first_name": first_name,
            "last_name": last_name,
            "is_admin": is_admin,
            "phone_number": phone_number,
            "street_address": street_address,
            "city": city,
            "state": state,
            "zip_code": zip_code,
            "email": email,
            "latitude": latitude,
            "longitude": longitude,
            "token": token
        }

        return user_info

    except Exception as e:
        print(e)
        cursor.close()
        conn.close()
        return "An error occurred while creating the user"


def createJWT(email, secret, authz):
    return jwt.encode(
        {
            "email": email,
            "exp": datetime.datetime.now(tz=datetime.timezone.utc)
            + datetime.timedelta(days=1),
            "iat": datetime.datetime.utcnow(),
            "is_admin": authz,
        },
        secret,
        algorithm="HS256",
    )


def validate(data):
    encoded_jwt = data.headers.get('Authorization')

    if not encoded_jwt:
        return "Missing Credentials", 401

    # Split the encoded_jwt using space
    jwt_parts = encoded_jwt.split(" ")

    # Check if the split produced at least two parts
    if len(jwt_parts) < 2:
        return "Invalid Token Format", 400

    # Access the second part (index 1) of the jwt_parts list
    encoded_jwt = jwt_parts[1]

    try:
        decoded = jwt.decode(
            encoded_jwt, os.environ.get("JWT_SECRET"), algorithms=["HS256"]
        )

    except:
        return "Not Authorized", 403

    email = decoded['email']

    return email, 200
