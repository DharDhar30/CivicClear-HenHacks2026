"""
Database layer for CivicClear: SQLite and user operations.
"""
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "civicclear.db")


def get_connection():
    """Return a connection to the SQLite database."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create the users table if it does not exist."""
    conn = get_connection()
    try:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)
        conn.commit()
    finally:
        conn.close()


def add_user(email: str, password_hash: str):
    """
    Insert a new user. Returns user row (id, email, password_hash, created_at) or None if email exists.
    """
    conn = get_connection()
    try:
        cur = conn.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (email.strip().lower(), password_hash),
        )
        conn.commit()
        row = conn.execute(
            "SELECT id, email, password_hash, created_at FROM users WHERE id = ?",
            (cur.lastrowid,),
        ).fetchone()
        return (row["id"], row["email"], row["password_hash"], row["created_at"]) if row else None
    except sqlite3.IntegrityError:
        conn.rollback()
        return None
    finally:
        conn.close()


def get_user_by_email(email: str):
    """
    Return user row (id, email, password_hash, created_at) or None.
    """
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT id, email, password_hash, created_at FROM users WHERE email = ?",
            (email.strip().lower(),),
        ).fetchone()
        return tuple(row) if row else None
    finally:
        conn.close()
