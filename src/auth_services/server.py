import jwt
import os
import datetime
import hashlib
import secrets
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import mysql.connector
from dotenv import load_dotenv
from storage import util as storage_util
from users import util as users_util
from admin import util as admin_util
from flask_cors import CORS


server = Flask(__name__)
api = Api(server)
# Allow requests from this origin
CORS(server, origins=['http://localhost:3000', 'http://localhost:3001'])


# tech user routes

@server.route("/register", methods=["POST"])
def register():
    response = users_util.register(request)

    return response


@server.route("/login", methods=["POST"])
def login():
    response = users_util.login(request)

    return response


@server.route("/me", methods=["POST"])
def get_me():
    response = users_util.get_me(request)

    return response


# admin routes


@server.route("/admin/register", methods=["POST"])
def admin_register():
    response = admin_util.register(request)

    return response


@server.route("/admin/login", methods=["POST"])
def admin_login():
    response = admin_util.login(request)

    return response


@server.route("/admin/me", methods=["POST"])
def admin_me():
    response = admin_util.me(request)

    return response


@server.route("/admin/users", methods=["GET"])
def get_users():
    response = admin_util.get_users()

    return response

# deactivate admin
# deactivate users


if __name__ == "__main__":
    server.run(host="0.0.0.0", port=5000)
