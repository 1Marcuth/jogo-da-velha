import { boardSize } from "./settings.js"

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

export default createGameBoardListener