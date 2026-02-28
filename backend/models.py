"""
User model and validation for CivicClear auth.
"""
import re


def validate_password(password: str):
    """
    Validate password: at least 8 characters, one uppercase, one special character.
    Returns (is_valid, error_message).
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters."
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one capital letter."
    if not re.search(r"[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?`~]", password):
        return False, "Password must contain at least one special character."
    return True, ""


def user_row_to_dict(row):
    """Convert DB row (id, email, password_hash, created_at) to dict (no password)."""
    if not row:
        return None
    return {
        "id": row[0],
        "email": row[1],
        "created_at": row[3],
    }
