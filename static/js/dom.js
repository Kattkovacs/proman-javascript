// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        let saveButton = document.querySelector("#save-button");
        saveButton.addEventListener('click', function(){
            dom.getBoardTitle();
        });
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for (let board of boards) {
            boardList += `
                    <section class="board" id="${board.id}">
                    <div class="board-header"><span class="board-title">${board.title}</span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                    </div>
                    </section>
                    `;
        }

        const outerHtml = `
                    <div class="board-container">
                        ${boardList}
                    </div>
                `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.innerHTML = '';
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
        let boardsToggle = document.querySelectorAll('.board-toggle');
        let boardsId = document.querySelectorAll('.board');

        for (let i = 0; i < boardsToggle.length; i++) {
            let boardId = boardsId[i].id;
            boardsToggle[i].setAttribute('boardId', `${boardId}`);
            boardsToggle[i].addEventListener('click', function () {
                let boardId = boardsToggle[i].getAttribute('boardId');
                let boardContainer = document.getElementById(boardId);
                if(boardContainer.querySelector('.board-columns')){
                    boardContainer.removeChild(boardContainer.querySelector('.board-columns'))
                } else{
                    dom.expandBoard(boardId);
                }
            });
        }
    },
    expandBoard: function (boardId) {
        dataHandler.getStatuses(function (allStatuses) {
        let statusColumns = '';

        for (let status of allStatuses) {
                statusColumns += `
                    <div class="board-column">
                    <div class="board-column-title">${status.title}</div>
                    <div class="board-column-content"></div>
                    </div>
                    `;
            }

                const outerHtml = `
                <div class="board-columns">
                ${statusColumns}
                </div>
                `;

        let currentBoard = document.getElementById(`${boardId}`);
        currentBoard.insertAdjacentHTML("beforeend", outerHtml);

        //Important: we have to get elements from the currentBoard (see in 81) instead of the whole document (see in 80)
        // let allBoardColumn = document.getElementsByClassName('board-column-content');
        let allBoardColumn = currentBoard.getElementsByClassName('board-column-content');

        for (let i = 0; i < allBoardColumn.length; i++) {
            allBoardColumn[i].setAttribute('columnId', `${allStatuses[i].id}`);
        }
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
                let columnId = Number(boardColumn.getAttribute('columnId'));
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
    getBoardTitle:function() {
        let boardTitle = document.querySelector('#board-name').value;
        dataHandler.createNewBoard(boardTitle, function() {
           alert("hello");
        })
 },
};
