import os
import datetime
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


def submit_quote(request):
    data = request.json

    # Extract quote data from the JSON
    project_id = data.get('project_id')
    total_amount = data.get('total_amount')
    quote_date = datetime.date.today()
    status = 'Submitted'
    date_created = datetime.datetime.now()

    # Extract quote entries data from the JSON
    quote_entries = data.get('quote_entries', [])

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        # Insert quote information into the quotes table
        query = """
        INSERT INTO quotes (quote_date, project_id, total_amount, status, date_created)
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (quote_date, project_id, total_amount, status, date_created)
        cursor.execute(query, values)

        # Retrieve the quote_id of the newly inserted quote
        quote_id = cursor.lastrowid

        # Update the projects table with the quote_id and quote_status
        update_query = """
        UPDATE projects
        SET quote_id = %s, quote_status = %s
        WHERE project_id = %s
        """
        update_values = (quote_id, 'Submitted', project_id)
        cursor.execute(update_query, update_values)

        # Insert quote entries into the quote_entry table
        for entry in quote_entries:
            entry_type = entry.get('entry_type')
            entry_description = entry.get('entry_description')
            entry_amount = entry.get('entry_amount')

            entry_query = """
            INSERT INTO quote_entry (quote_id, entry_type, entry_description, entry_amount)
            VALUES (%s, %s, %s, %s)
            """
            entry_values = (quote_id, entry_type,
                            entry_description, entry_amount)
            cursor.execute(entry_query, entry_values)

        conn.commit()
        # 201 Created
        return jsonify({"message": "Quote submitted successfully"}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500  # 500 Internal Server Error
    finally:
        cursor.close()
        conn.close()


def update_quote(request):
    data = request.json
    project_id = data.get('project_id')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        # Look up the quote_id based on the project_id
        quote_id_query = """
        SELECT quote_id FROM quotes
        WHERE project_id = %s
        """
        cursor.execute(quote_id_query, (project_id,))
        quote_id_result = cursor.fetchone()

        if not quote_id_result:
            # 404 Not Found
            return jsonify({"error": "Quote not found for the given project_id"}), 404

        quote_id = quote_id_result[0]  # Extract the quote_id

        # Extract quote data from the JSON
        total_amount = data.get('total_amount')
        status = data.get('status')

        # Extract quote entries data from the JSON
        quote_entries = data.get('quote_entries', [])

        # Update quote information in the quotes table
        quote_update_query = """
        UPDATE quotes
        SET total_amount = %s, status = %s
        WHERE quote_id = %s
        """
        quote_update_values = (total_amount, status, quote_id)
        cursor.execute(quote_update_query, quote_update_values)

        # Delete existing quote entries for this quote
        delete_query = """
        DELETE FROM quote_entry
        WHERE quote_id = %s
        """
        cursor.execute(delete_query, (quote_id,))

        # Insert updated quote entries into the quote_entry table
        for entry in quote_entries:
            entry_type = entry.get('entry_type')
            entry_description = entry.get('entry_description')
            entry_amount = entry.get('entry_amount')

            entry_query = """
            INSERT INTO quote_entry (quote_id, entry_type, entry_description, entry_amount)
            VALUES (%s, %s, %s, %s)
            """
            entry_values = (quote_id, entry_type,
                            entry_description, entry_amount)
            cursor.execute(entry_query, entry_values)

        conn.commit()
        # 200 OK
        return jsonify({"message": "Quote updated successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500  # 500 Internal Server Error
    finally:
        cursor.close()
        conn.close()


def get_quote(request):
    data = request.json
    project_id = data.get('project_id')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    try:
        # Retrieve quote information from the quotes table based on project_id
        quote_id_query = """
        SELECT quote_id FROM quotes
        WHERE project_id = %s
        """
        cursor.execute(quote_id_query, (project_id,))
        quote_id = cursor.fetchone()

        if not quote_id:
            return jsonify({"error": "Quote not found"}), 404  # 404 Not Found

        # Retrieve quote details based on the obtained quote_id
        quote_query = """
        SELECT * FROM quotes
        WHERE quote_id = %s
        """
        cursor.execute(quote_query, (quote_id['quote_id'],))
        quote_data = cursor.fetchone()

        # Retrieve quote entries associated with the quote from the quote_entry table
        entry_query = """
        SELECT * FROM quote_entry
        WHERE quote_id = %s
        """
        cursor.execute(entry_query, (quote_id['quote_id'],))
        quote_entries = cursor.fetchall()

        quote_data['quote_entries'] = quote_entries

        return jsonify(quote_data), 200  # 200 OK
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # 500 Internal Server Error
    finally:
        cursor.close()
        conn.close()
