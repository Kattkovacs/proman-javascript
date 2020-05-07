from flask import Flask, render_template, url_for, request, redirect
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')
    # return render_template('design.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    Get all the general statuses from database
    """
    return data_handler.get_statuses()


@app.route("/new-board", methods=['POST'])
@json_response
def create_board():
    """
    Get all the general statuses from database
    """
    board_title = request.get_json()
    return data_handler.create_board(board_title)


@app.route("/new-card", methods=['POST'])
@json_response
def create_card():

    card_title = request.get_json()
    return data_handler.create_card(card_title)


@app.route("/boards/<board_id>/delete")
@json_response
def delete(board_id: int):
    return data_handler.delete_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
