import os
import datetime
import googlemaps
import mysql.connector
from flask import jsonify
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

# config
db_config = {
    "host": os.environ.get("MYSQL_HOST"),
    "user": os.environ.get("MYSQL_USER"),
    "password": os.environ.get("MYSQL_PASSWORD"),
    "database": os.environ.get("MYSQL_DB")
}

user_db_config = {
    "host": os.environ.get("MYSQL_HOST"),
    "user": os.environ.get("MYSQL_USER"),
    "password": os.environ.get("MYSQL_PASSWORD"),
    "database": os.environ.get("MYSQL_USER_DB")
}

api_key = os.environ.get("GOOGLE_API_KEY")

# Helper Function for Geo-Location


def get_location(address):
    # Create a Google Maps client
    gmaps = googlemaps.Client(key=api_key)

    # Geocode an address
    geocode_result = gmaps.geocode(address)

    if geocode_result:
        location = geocode_result[0]['geometry']['location']
        latitude = round(location['lat'], 8)
        longitude = round(location['lng'], 8)

        return latitude, longitude
    else:
        print("No geocoding results found.")


# Calculate Distance Between Tech and Project


def calculate_distance(destination, tech_id):
    conn = mysql.connector.connect(**user_db_config)
    cursor = conn.cursor()

    try:
        # Retrieve tech's address, city, and state using tech_id
        query = """
        SELECT street_address, city, state
        FROM users
        WHERE id = %s
        """
        cursor.execute(query, (tech_id,))
        tech_data = cursor.fetchone()

        if tech_data:
            street_address, city, state = tech_data
            origin = f"{street_address} {city}, {state}"

            # Create a Google Maps client
            gmaps = googlemaps.Client(key=api_key)

            distance_matrix = gmaps.distance_matrix(origin, destination)
            distance = distance_matrix['rows'][0]['elements'][0]['distance']['value']

            print("origin", origin)
            print("distance", distance)
            # Converts meters to miles
            distance = distance * 0.000621371

            cursor.close()
            conn.close()

            return distance
        else:
            cursor.close()
            conn.close()
            return None

    except Exception as e:
        print(e)
        cursor.close()
        conn.close()
        return None


def add_project(request):
    data = request.json

    # function to add data into the project database
    # function to add tenant info into the tenant table
    # function to add the pm info into the pm table

    # Extract data from the JSON
    address = data.get('address')
    city = data.get('city')
    state = data.get('state')
    zip_code = data.get('zip_code')
    date_created = datetime.datetime.now()
    last_updated = datetime.datetime.now()
    status = data.get('status')
    tech_id = data.get('tech_id')
    project_type = data.get('type')
    company = data.get('company')
    tenant_name = data.get('tenant_name')
    tenant_phone = data.get('tenant_phone')
    pm_name = data.get('pm_name')
    pm_phone = data.get('pm_phone')
    instructions = data.get('instructions')
    notes = data.get('notes')
    wo = data.get('wo')

    # Get Geo-Location of Project Address
    full_address = address + '' + city + ',' + state
    geo_locate = get_location(full_address)
    latitude = geo_locate[0]
    longitude = geo_locate[1]

    # Calculate Distance From Tech's Home
    distance = calculate_distance(
        destination=full_address, tech_id=tech_id)

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Insert data into the database
    query = """
    INSERT INTO Projects (
        address, city, state, zip_code, date_created, last_updated, status, tech_id, type, company, tenant_name, tenant_phone, pm_name, pm_phone, instructions, notes, latitude, longitude, distance, wo

    )
    VALUES (%s, %s, %s, %s, %s, %s,
     %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        address, city, state, zip_code, date_created, last_updated, status, tech_id, project_type, company, tenant_name, tenant_phone, pm_name, pm_phone, instructions, notes, latitude, longitude, distance, wo
    )
    cursor.execute(query, values)

    conn.commit()
    cursor.close()
    conn.close()

    return "Project added successfully"


def add_projects(request):
    data = request.json

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Prepare the query template for insertion
    query_template = """
    INSERT INTO Projects (
        address, city, date_created, distance, invoice_id,
        last_updated, latitude, longitude, pm_name, pm_phone, project_id,
        quote_id, state, status, tech_id, tenant_name, tenant_phone,
        type, zip_code
    )
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    # Iterate through the projects and insert them into the database
    for project in data:
        # Extract data from the project JSON
        address = project.get('address')
        city = project.get('city')
        date_created = project.get('date_created')
        invoice_id = project.get('invoice_id')
        last_updated = project.get('last_updated')
        project_id = project.get('project_id')
        quote_id = project.get('quote_id')
        state = project.get('state')
        status = project.get('status')
        tech_id = project.get('tech_id') or 12
        project_type = project.get('type')
        zip_code = project.get('zip_code')

        # Get Geo-Location of Project Address
        full_address = address + ' ' + city + ', ' + state
        geo_locate = get_location(full_address)
        latitude = geo_locate[0]
        longitude = geo_locate[1]

        # Calculate Distance From Tech's Home
        distance = calculate_distance(
            destination=full_address, tech_id=tech_id)

        # Insert data into the database
        values = (
            address, city, date_created, distance, invoice_id,
            last_updated, latitude, longitude, project_id,
            quote_id, state, status, tech_id,
            project_type, zip_code
        )
        cursor.execute(query_template, values)

    conn.commit()
    cursor.close()
    conn.close()

    return "Projects added successfully"


def update_project(request):
    data = request.json

    # Extract data from the JSON
    project_id = data.get('project_id')
    address = data.get('address')
    city = data.get('city')
    date_created = data.get('date_created')
    distance = data.get('distance_from_home')
    invoice_id = data.get('invoice_id')
    last_updated = data.get('last_updated')
    quote_id = data.get('quote_id')
    state = data.get('state')
    status = data.get('status')
    tech_id = data.get('tech_id')
    project_type = data.get('type')
    zip_code = data.get('zip_code')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Update data in the database
    query = """
    UPDATE Projects
    SET address = %s, city = %s, date_created = %s, distance = %s,
        invoice_id = %s, last_updated = %s,
        quote_id = %s, state = %s, status = %s, tech_id = %s,  type = %s, zip_code = %s
    WHERE project_id = %s
    """
    values = (
        address, city, date_created, distance, invoice_id,
        last_updated, quote_id, state, status, tech_id, project_type, zip_code, project_id
    )
    cursor.execute(query, values)

    conn.commit()
    cursor.close()
    conn.close()

    return "Project updated successfully"


def delete_project(request):
    data = request.json
    project_id = data.get('project_id')
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Delete project by project_id
    query = "DELETE FROM Projects WHERE project_id = %s"
    cursor.execute(query, (project_id,))

    conn.commit()
    cursor.close()
    conn.close()

    return f"Project with ID {project_id} deleted successfully"


def get_user_projects(request):
    try:
        data = request.json
        user_id = data.get('tech_id')

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Get column names
        column_query = "SHOW COLUMNS FROM Projects"
        cursor.execute(column_query)
        column_names = [column[0] for column in cursor.fetchall()]

        # Select projects for the given tech_id
        project_query = """
        SELECT *
        FROM Projects
        WHERE tech_id = %s
        """
        cursor.execute(project_query, (user_id,))
        projects = cursor.fetchall()

        cursor.close()
        conn.close()

        project_list = []
        for project in projects:
            project_dict = {}
            for i, column_name in enumerate(column_names):
                project_dict[column_name] = project[i]
            project_list.append(project_dict)

        return jsonify(project_list)  # Return the list of projects as JSON
    except Exception as e:
        print(e)
        return jsonify({"message": "An error occurred while fetching projects."}), 500


def get_all_projects():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Get column names
        column_query = "SHOW COLUMNS FROM Projects"
        cursor.execute(column_query)
        column_names = [column[0] for column in cursor.fetchall()]

        # Select all projects
        project_query = """
        SELECT *
        FROM Projects
        """
        cursor.execute(project_query)
        projects = cursor.fetchall()

        cursor.close()
        conn.close()

        project_list = []
        for project in projects:
            project_dict = {}
            for i, column_name in enumerate(column_names):
                project_dict[column_name] = project[i]
            project_list.append(project_dict)

        return jsonify(project_list)  # Return the list of projects as JSON
    except Exception as e:
        print(e)
        return jsonify({"message": "An error occurred while fetching projects."}), 500


# Function to re-assign a project
def reassign_project(project, to_tech):
    # Re-calculate the distance between the project and the user
    # Re-assign the project to a different user
    return 'Project Re-Assigned'
