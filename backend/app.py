"""
CivicClear backend: auth API for login and signup.
"""
import os
import sys

# Ensure backend directory is on path so imports work when run from any cwd
# (e.g. "python app.py" from backend/ or "python backend/app.py" from project root)
_backend_dir = os.path.dirname(os.path.abspath(__file__))
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from flask import Flask, request, jsonify  # noqa: E402
from flask_cors import CORS  # type: ignore[import-untyped] # noqa: E402
from werkzeug.security import generate_password_hash, check_password_hash  # noqa: E402

from database import init_db, add_user, get_user_by_email  
from models import validate_password, user_row_to_dict  

app = Flask(__name__)
CORS(app, origins=["*"])

# Initialize database and users table on startup
init_db()


@app.route("/api/signup", methods=["POST"])
def signup():
    """
    Register a new account. Expects JSON: { "email", "password", "confirmPassword" }.
    Password: 8+ chars, at least one capital, one special character.
    """
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    confirm_password = data.get("confirmPassword") or ""

    if not email or not password or not confirm_password:
        return jsonify({"success": False, "message": "Please fill in all fields."}), 400

    if password != confirm_password:
        return jsonify({"success": False, "message": "Passwords do not match."}), 400

    valid, msg = validate_password(password)
    if not valid:
        return jsonify({"success": False, "message": msg}), 400

    password_hash = generate_password_hash(password, method="scrypt")
    row = add_user(email, password_hash)

    if row is None:
        return jsonify({"success": False, "message": "Account already exists."}), 409

    user = user_row_to_dict(row)
    return jsonify({
        "success": True,
        "message": "Account created! Redirecting to login...",
        "user": user,
    }), 201


@app.route("/api/login", methods=["POST"])
def login():
    """
    Log in. Expects JSON: { "email", "password" }.
    """
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"success": False, "message": "Please provide email and password."}), 400

    row = get_user_by_email(email)
    if not row:
        return jsonify({"success": False, "message": "Invalid email or password."}), 401

    _id, _email, password_hash, created_at = row
    if not check_password_hash(password_hash, password):
        return jsonify({"success": False, "message": "Invalid email or password."}), 401

    user = user_row_to_dict(row)
    return jsonify({
        "success": True,
        "message": "Login successful!",
        "user": user,
    }), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
