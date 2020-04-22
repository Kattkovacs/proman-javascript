// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
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
            // let boardId = parseInt(boardsId[i].id);
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
        let allStatuses = dataHandler.getStatuses(function (allStatuses) {
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
        });
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        console.log('boardId:',boardId);
        dataHandler.getCardsByBoardId(boardId, function (cards){
            dom.showCards(cards);
            console.log(cards)
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};
