from psycopg2.extras import RealDictCursor
import database_common

# SQL STARTS FROM HERE


@database_common.connection_handler
def create_board(cursor: RealDictCursor, board_title):
    query = f"""
        INSERT INTO boards (title)
        VALUES (
                %(title)s
                )
--                 RETURNING id
                ;"""
    cursor.execute(query, board_title)


@database_common.connection_handler
def create_card(cursor: RealDictCursor, card_data):
    query = f"""
            INSERT INTO cards (board_id, title, status_id, "order")
            VALUES (
            %(board_id)s,
            %(title)s,
            DEFAULT, 
            %(order)s
            )
--             RETURNING id
            ;"""
    cursor.execute(query, card_data)


@database_common.connection_handler
def get_boards(cursor: RealDictCursor):
    query = f"""
            SELECT id, title
            FROM boards
            ORDER by id ASC
            ;"""
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def get_cards(cursor: RealDictCursor):
    query = f"""
            SELECT *
            FROM cards
            ORDER BY id ASC
            ;"""
    cursor.execute(query)
    return cursor.fetchall()

@database_common.connection_handler
def get_statuses(cursor: RealDictCursor):
    query = f"""
            SELECT id, title
            FROM statuses
            ORDER BY id ASC
            ;"""
    cursor.execute(query)
    return cursor.fetchall()
