import jwt
import os
import datetime
import hashlib
import secrets
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import mysql.connector
from dotenv import load_dotenv
from invoice import util as invoice_util
from project import util as project_util
from quote import util as quote_util
from flask_cors import CORS

load_dotenv()  # Load environment variables from .env file

server = Flask(__name__)
api = Api(server)

CORS(server, origins=['http://localhost:3000',
     'http://localhost:3001', 'http://localhost:3002'])

# config
db_config = {
    "host": os.environ.get("MYSQL_HOST"),
    "user": os.environ.get("MYSQL_USER"),
    "password": os.environ.get("MYSQL_PASSWORD"),
    "database": os.environ.get("MYSQL_DB")
}


@server.route('/add', methods=['POST'])
def add_project():
    response = project_util.add_project(request)

    return response


@server.route('/add_projects', methods=['POST'])
def add_projects():
    response = project_util.add_projects(request)

    return response


@server.route('/update', methods=['PUT'])
def update_project():
    response = project_util.update_project(request)

    return response


@server.route('/reassign', methods=['PUT'])
def reassign_project():
    response = project_util.reassign_project(request)

    return response


@server.route('/delete', methods=['DELETE'])
def delete_project():
    response = project_util.delete_project(request)

    return response


@server.route('/user_projects', methods=['POST'])
def get_user_projects():
    print(request)
    response = project_util.get_user_projects(request)

    return response


@server.route('/all_projects', methods=['GET'])
def get_all_projects():
    response = project_util.get_all_projects()

    return response


@server.route('/submit_quote', methods=['POST'])
def submit_quote():
    response = quote_util.submit_quote(request)

    return response


@server.route('/update_quote', methods=['PUT'])
def update_quote():
    response = quote_util.update_quote(request)

    return response


@server.route('/get_quote', methods=['GET'])
def get_quote():
    response = quote_util.get_quote(request)

    return response


@server.route('/submit_invoice', methods=['POST'])
def submit_invoice():
    response = invoice_util.submit_invoice(request)

    return response


@server.route('/update_invoice', methods=['PUT'])
def update_invoice():
    response = invoice_util.update_invoice(request)

    return response


@server.route('/get_invoice', methods=['GET'])
def get_invoice():
    response = invoice_util.get_invoice(request)

    return response


if __name__ == "__main__":
    server.run(host="0.0.0.0", port=8080)
