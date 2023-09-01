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


@server.route('/')
def home():
    return 'Hello, Flask World!'


@server.route('/add', methods=['POST'])
def add_project():
    response = util.add_project(request)

    return response


@server.route('/add_projects', methods=['POST'])
def add_projects():
    response = util.add_projects(request)

    return response


@server.route('/update', methods=['PUT'])
def update_project():
    response = util.update_project(request)

    return response


@server.route('/reassign', methods=['PUT'])
def reassign_project():
    response = util.reassign_project(request)

    return response


@server.route('/delete', methods=['DELETE'])
def delete_project():
    response = util.delete_project(request)

    return response


@server.route('/user_projects')
def get_user_projects():
    response = util.get_user_projects(request)

    return response


@server.route('/all_projects')
def get_all_projects():
    response = util.get_all_projects()

    return response


if __name__ == "__main__":
    server.run(host="0.0.0.0", port=8080)
