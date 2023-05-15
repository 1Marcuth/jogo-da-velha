import { boardSize, icons } from "./settings.js"

function createGameBoard(game) {
    const $gameBoard = document.querySelector("#game-board")

    let html = "<table colomnpadding=0 cellpadding=0>"

    for (let row = 0; row < boardSize.height; row++) {
        html += "<tr>"

        for (let column = 0; column < boardSize.width; column++) {
            const cellIndex = column + (row * boardSize.height)

            html += `<td id="cell-${cellIndex}">`
            html += icons[game.state.shape[cellIndex]]
            html += "</td>"
        }

        html += "</tr>"
    }

    html += "</table>"

    $gameBoard.innerHTML = html

    return $gameBoard
}

function updateGameBoard(game, $gameBoard) {
    const $gameBoardTable = $gameBoard.querySelector("table")

    for (let row = 0; row < boardSize.height; row++) {
        for (let column = 0; column < boardSize.width; column++) {
            const cellIndex = column + (row * boardSize.height)
            const $cell = $gameBoardTable.rows[row].cells[column]

            $cell.innerHTML = icons[game.state.shape[cellIndex]]
        }
    }
}

function createGameBoardListener($gameBoard) {
    const state = {
        observers: [],
        listeners: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    const $gameBoardTable = $gameBoard.querySelector("table")

    for (let i = 0; i < boardSize.width * boardSize.height; i++) {
        const $element = $gameBoardTable.querySelector(`#cell-${i}`)
        state.listeners.push($element.addEventListener("click", cellClick))
    }

    function cellClick(event) {
        const cellIndex = Number(event.target.id.replace("cell-", ""))

        notifyAll({
            type: "cell-click",
            index: cellIndex
        })
    }

    return { subscribe }
}

export {
    createGameBoard,
    updateGameBoard
}