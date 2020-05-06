import persistence
import data_handler_sql


# def get_statuses_csv():
#     statuses = persistence.get_statuses()
#     return statuses

def get_statuses():
    statuses = data_handler_sql.get_statuses()
    return statuses


#
# def get_card_status_csv(status_id):
#     """
#     Find the first status matching the given id
#     :param status_id:
#     :return: str
#     """
#     statuses = persistence.get_statuses()
#     return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')

def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = data_handler_sql.get_card_by_status_id(status_id)
    return statuses


# def get_boards_csv():
#     """
#     Gather all boards
#     :return:
#     """
#     return persistence.get_boards(force=True)


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_handler_sql.get_boards()


# def get_cards_for_board_csv(board_id):
#     persistence.clear_cache()
#     all_cards = persistence.get_cards()
#     matching_cards = []
#     for card in all_cards:
#         if card['board_id'] == str(board_id):
#             card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
#             matching_cards.append(card)
#     return matching_cards


def get_cards_for_board(board_id):
    matching_cards = data_handler_sql.get_cards_by_board_id(board_id)
    return matching_cards


def create_board(board_title):
    return data_handler_sql.create_board(board_title)


def delete_board(board_id):
    return data_handler_sql.delete_board(board_id)
