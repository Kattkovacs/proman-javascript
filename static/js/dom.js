// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        let saveButton = document.querySelector("#save-button");
        saveButton.addEventListener('click', function(){
            dom.createBoard();
        });
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.createBoardContainerHTML();
            dom.showBoards(boards);
            let boardsToggle = document.querySelectorAll('.board-toggle');
            dom.addEventHandlerToBoardsToggle(boardsToggle);
            let boardsRemove = document.querySelectorAll('.board-remove');
            dom.addEventHandlerToBoardsDelete(boardsRemove);
            // let boardsAdd = document.querySelectorAll('.board-add');
            // dom.addEventHandlerToAddCard(boardsAdd)
            let boardsHeader = document.querySelectorAll('.board-header');
            dom.addEventHandlerToAddCard(boardsHeader)
        });
    },
    createBoardContainerHTML: function () {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        const boardContainerHTML = `
                    <div class="board-container"></div>
                `;

        let boardsBox = document.querySelector('#boards');
        boardsBox.innerHTML = '';
        boardsBox.insertAdjacentHTML("beforeend", boardContainerHTML);
    },
    showBoards: function (boards) {
        let boardHTML = '';
        // <input type="hidden" class="card-name-input" data-boardId="${board.id}" placeholder="Type card name here...">
        for (let board of boards) {
            boardHTML += `
                    <section class="board" data-id="${board.id}">
                    <div class="board-header"><span class="board-title">${board.title}</span>
                    <button class="board-add" data-boardId="${board.id}">Add Card</button>
                    <div class="input-group input-group-sm" style="display: none">
                    <input type="text" class="form-control card-name-input" data-boardId="${board.id}" placeholder="Card's name" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Cancel</button>
                    <button class="btn btn-outline-primary" type="button">Save</button>
                    </div>
                    </div>
                    <button class="board-toggle" data-boardId="${board.id}"><i class="fas fa-chevron-down"></i></button>
                    <button class="board-remove" data-boardId="${board.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    </section>
                    `;
        }
        let boardContainer = document.querySelector('.board-container');
        boardContainer.insertAdjacentHTML("beforeend", boardHTML);
    },
    addEventHandlerToBoardsToggle : function(boardsToggle) {
        for (let boardToggle of boardsToggle) {
            boardToggle.addEventListener('click', function () {
                let boardId = boardToggle.getAttribute('data-boardId');
                let boardContainer = document.querySelector(`.board[data-id="${boardId}"]`);

                if(boardContainer.querySelector('.board-columns')){
                    boardContainer.removeChild(boardContainer.querySelector('.board-columns'))
                } else {
                    dom.expandBoard(boardId);
                }
            });
        }
    },
    addEventHandlerToBoardsDelete : function(boardsRemove) {
        for (let boardRemove of boardsRemove) {
            boardRemove.addEventListener('click', function () {
                let boardId = boardRemove.getAttribute('data-boardId');
                let board = document.querySelector(`.board[data-id="${boardId}"]`);
                dataHandler.deleteBoard(boardId, function () {
                    board.remove()
                })
            })
        }
    },
        // addEventHandlerToAddCard : function(boardsAdd) {
    //     console.log(boardsAdd)
    //     for (let boardAdd of boardsAdd) {
    //         // console.log(boardAdd)
    //         let boardId = boardAdd.getAttribute('data-boardId')
    //         console.log(boardId)
    //         boardAdd.addEventListener('click', function () {
    //             let hidden = boardAdd.parentNode.querySelector(`.card-name-input`);
    //             console.log(hidden)
    //             hidden.setAttribute('type', 'text')
    //         })
    //     }
    // },
    // This eventHandler works with one single input-field!
    // addEventHandlerToAddCard : function(boardsHeader) {
    //     for (let boardHeader of boardsHeader) {
    //         let boardAdd = boardHeader.querySelector('.board-add');
    //         boardAdd.addEventListener('click', function () {
    //             let cardNameInput = boardHeader.querySelector('.card-name-input');
    //             if(cardNameInput.getAttribute('type') === 'hidden') {
    //                 cardNameInput.setAttribute('type', 'text');
    //                 boardAdd.innerHTML='Cancel'
    //             } else {
    //                 cardNameInput.setAttribute('type', 'hidden');
    //                 boardAdd.innerHTML='Add Card'
    //             }
    //         })
    //     }
    // },
    addEventHandlerToAddCard : function(boardsHeader) {
        for (let boardHeader of boardsHeader) {
            let boardAdd = boardHeader.querySelector('.board-add');
            boardAdd.addEventListener('click', function () {
                let cardNameInputGroup = boardHeader.querySelector('.input-group');
                if (cardNameInputGroup.style.display === 'none') {
                    cardNameInputGroup.style.display = 'inline-flex';
                } else {
                    cardNameInputGroup.style.display = 'none';
                }
            })
        }
    },
    expandBoard: function (boardId) {
        dataHandler.getStatuses(function (allStatuses) {
        let statusColumns = '';

        for (let status of allStatuses) {
                statusColumns += `
                    <div class="board-column">
                    <div class="board-column-title">${status.title}</div>
                    <div class="board-column-content" data-columnId="${status.id}"></div>
                    </div>
                    `;
            }

                const outerHtml = `
                <div class="board-columns">
                ${statusColumns}
                </div>
                `;

        let currentBoard = document.querySelector(`.board[data-id="${boardId}"]`);
        currentBoard.insertAdjacentHTML("beforeend", outerHtml);
        let allBoardColumn = currentBoard.getElementsByClassName('board-column-content');
        dom.loadCards(boardId, allBoardColumn);
        });
    },
    loadCards: function (boardId, allBoardColumn) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards){
            dom.showCards(boardId, cards, allBoardColumn);
        });
    },
    showCards: function (boardId, cards, allBoardColumn) {
        // shows the cards of a board
        // it adds necessary event listeners also
        for (let card of cards) {
            let cardElement = '';
            let statusId = card.status_id;
            let cardTitle = card.title;

            for (let boardColumn of allBoardColumn) {
                let columnId = Number(boardColumn.getAttribute('data-columnId'));
                if (statusId === columnId) {
                    cardElement += `
                         <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">${cardTitle}</div>
                        </div>
                    `;
                    boardColumn.innerHTML += cardElement;
                }
            }
        }
    },
    // here comes more features
    createBoard:function() {
        let boardTitle = document.querySelector('#board-name').value;
        dataHandler.createNewBoard(boardTitle, function(response) {
            response.title = boardTitle;
            let boards = Array(response);
            dom.showBoards(boards);
            let boardsToggle = document.querySelectorAll(`.board-toggle[data-boardId="${response.id}"]`);
            dom.addEventHandlerToBoardsToggle(boardsToggle);
            let boardsRemove = document.querySelectorAll(`.board-remove[data-boardId="${response.id}"]`);
            dom.addEventHandlerToBoardsDelete(boardsRemove);
        });
        document.querySelector('#board-name').value = '';
    },
    createCard:function() {
        let addCard = document.querySelector('.card-name-input');
        let cardTitle = addCard.value;
        let boardId = addCard.getAttribute('data-boardId');
        dataHandler.createNewCard(cardTitle, boardId, function(response) {
            console.log('helló')
        })
    }
};


