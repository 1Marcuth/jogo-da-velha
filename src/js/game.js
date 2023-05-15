import { boardSize } from "./settings.js"

function createDataStructure() {
    let dataStructure = []

    for (let i = 0; i < 9; i++) {
        dataStructure.push(0)
    }

    return dataStructure
}

function createGame() {
    const state = {
        shape: createDataStructure()
    }

    function getStatus() {
        const indexesAvailable = getIndexesAvailable()

        const winCheckResult = checkWin()

        if (winCheckResult !== null) {
            return {
                type: "finished-victory",
                index: winCheckResult
            }
        }

        if (indexesAvailable.length === 0) {
            return {
                type: "finished-old"
            }
        }

        return {
            type: "open"
        }
    }

    function getIndexesAvailable() {
        const allIndexes = state.shape.map((_, i) => i)
        const indexesAvailable = allIndexes.filter(index => state.shape[index] === 0)
        return indexesAvailable
    }

    function peoplePlay(cellIndex, iconIndex = 1) {
        const indexesAvailable = getIndexesAvailable()

        if (!indexesAvailable.includes(cellIndex)) {
            throw new Error("O Índice não está disponível!")
        }

        state.shape[cellIndex] = iconIndex
    }

    function botPlay(iconIndex = 2) {
        const indexesAvailable = getIndexesAvailable()

        const selectedIndex = indexesAvailable[Math.floor(
            Math.random() * indexesAvailable.length
        )]

        state.shape[selectedIndex] = iconIndex
    }

    function checkWin() {
        for (let i = 0; i < boardSize.width * boardSize.height; i += 3) {
            if (state.shape[i] !== 0 && state.shape[i] === state.shape[i+1] && state.shape[i] === state.shape[i+2]) {
                return state.shape[i]
            }
        }
        
        for (let i = 0; i < boardSize.width; i++) {
            if (state.shape[i] !== 0 && state.shape[i] === state.shape[i+3] && state.shape[i] === state.shape[i+6]) {
                return state.shape[i]
            }
        }
        
        if (state.shape[0] !== 0 && state.shape[0] === state.shape[4] && state.shape[0] === state.shape[8]) {
            return state.shape[0]
        }
        
        if (state.shape[2] !== 0 && state.shape[2] === state.shape[4] && state.shape[2] === state.shape[6]) {
            return state.shape[2]
        }
        
        return null
    }

    function start() {
        const whoStart = Math.round(Math.random() * 1) + 1
        console.log(whoStart)

        if (whoStart === 2) {
            botPlay()
        }
    }

    function reset() {
        state.shape = createDataStructure()
    }

    return {
        state,
        start,
        reset,
        peoplePlay,
        botPlay,
        getStatus
    }
}

export default createGame