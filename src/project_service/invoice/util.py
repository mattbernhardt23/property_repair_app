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


def submit_invoice(request):
    data = request.json

    # Extract invoice data from the JSON
    project_id = data.get('project_id')
    total_amount = data.get('total_amount')
    invoice_date = datetime.date.today()
    status = 'Submitted'
    date_created = datetime.datetime.now()

    # Extract invoice entries data from the JSON
    invoice_entries = data.get('invoice_entries', [])

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        # Insert invoice information into the invoices table
        query = """
        INSERT INTO invoices (invoice_date, project_id, total_amount, status, date_created)
        VALUES (%s, %s, %s, %s, %s)
        """
        values = (invoice_date, project_id, total_amount, status, date_created)
        cursor.execute(query, values)

        # Retrieve the invoice_id of the newly inserted invoice
        invoice_id = cursor.lastrowid

        # Update the projects table with the quote_id and quote_status
        update_query = """
        UPDATE projects
        SET invoice_id = %s, invoice_status = %s
        WHERE project_id = %s
        """
        update_values = (invoice_id, 'Submitted', project_id)
        cursor.execute(update_query, update_values)

        # Insert invoice entries into the invoice_entry table
        for entry in invoice_entries:
            entry_type = entry.get('entry_type')
            entry_description = entry.get('entry_description')
            entry_amount = entry.get('entry_amount')

            entry_query = """
            INSERT INTO invoice_entry (invoice_id, entry_type, entry_description, entry_amount)
            VALUES (%s, %s, %s, %s)
            """
            entry_values = (invoice_id, entry_type,
                            entry_description, entry_amount)
            cursor.execute(entry_query, entry_values)

        conn.commit()
        # 201 Created
        return jsonify({"message": "Invoice submitted successfully"}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500  # 500 Internal Server Error
    finally:
        cursor.close()
        conn.close()


def update_invoice(request):
    data = request.json
    project_id = data.get('project_id')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        # Look up the invoice_id based on the project_id
        invoice_id_query = """
        SELECT invoice_id FROM invoices
        WHERE project_id = %s
        """
        cursor.execute(invoice_id_query, (project_id,))
        invoice_id_result = cursor.fetchone()

        if not invoice_id_result:
            # 404 Not Found
            return jsonify({"error": "Invoice not found for the given project_id"}), 404

        invoice_id = invoice_id_result[0]  # Extract the invoice_id

        # Extract invoice data from the JSON
        total_amount = data.get('total_amount')
        status = data.get('status')

        # Extract invoice entries data from the JSON
        invoice_entries = data.get('invoice_entries', [])

        # Update invoice information in the invoices table
        invoice_update_query = """
        UPDATE invoices
        SET total_amount = %s, status = %s
        WHERE invoice_id = %s
        """
        invoice_update_values = (total_amount, status, invoice_id)
        cursor.execute(invoice_update_query, invoice_update_values)

        # Delete existing invoice entries for this invoice
        delete_query = """
        DELETE FROM invoice_entry
        WHERE invoice_id = %s
        """
        cursor.execute(delete_query, (invoice_id,))

        # Insert updated invoice entries into the invoice_entry table
        for entry in invoice_entries:
            entry_type = entry.get('entry_type')
            entry_description = entry.get('entry_description')
            entry_amount = entry.get('entry_amount')

            entry_query = """
            INSERT INTO invoice_entry (invoice_id, entry_type, entry_description, entry_amount)
            VALUES (%s, %s, %s, %s)
            """
            entry_values = (invoice_id, entry_type,
                            entry_description, entry_amount)
            cursor.execute(entry_query, entry_values)

        conn.commit()
        # 200 OK
        return jsonify({"message": "Invoice updated successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500  # 500 Internal Server Error
    finally:
        cursor.close()
        conn.close()


def get_invoice(request):
    data = request.json
    project_id = data.get('project_id')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    try:
        # Retrieve invoice information from the invoices table based on project_id
        invoice_id_query = """
        SELECT invoice_id FROM invoices
        WHERE project_id = %s
        """
        cursor.execute(invoice_id_query, (project_id,))
        invoice_id = cursor.fetchone()

        if not invoice_id:
            # 404 Not Found
            return jsonify({"error": "Invoice not found"}), 404

        # Retrieve invoice details based on the obtained invoice_id
        invoice_query = """
        SELECT * FROM invoices
        WHERE invoice_id = %s
        """
        cursor.execute(invoice_query, (invoice_id['invoice_id'],))
        invoice_data = cursor.fetchone()

        # Retrieve invoice entries associated with the invoice from the invoice_entry table
        entry_query = """
        SELECT * FROM invoice_entry
        WHERE invoice_id = %s
        """
        cursor.execute(entry_query, (invoice_id['invoice_id'],))
        invoice_entries = cursor.fetchall()

        invoice_data['invoice_entries'] = invoice_entries

        return jsonify(invoice_data), 200  # 200 OK
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # 500 Internal Server Error
    finally:
        cursor.close()
        conn.close()
