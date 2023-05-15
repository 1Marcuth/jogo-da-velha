import { createGameBoard, updateGameBoard } from "./board.js"
import createGameBoardListener from "./board-listener.js"
import { icons } from "./settings.js"
import createGame from "./game.js"

function start() {
    const game = createGame()

    game.start()

    const $gameBoard = createGameBoard(game)
    const gameBoardListener = createGameBoardListener($gameBoard)
    let gameStatus = game.getStatus()

    gameBoardListener.subscribe((command) => {
        if (gameStatus.type === "finished-old") {

            const startNewGame = confirm("O jogo atual resultou-se em velha. Deseja iniciar uma nova partida?")

            if (startNewGame) {
                game.reset()
                updateGameBoard(game, $gameBoard)
                gameStatus = game.getStatus()
            }

            return
        } else if (gameStatus.type === "finished-victory") {
            const startNewGame = confirm(`O jogador do ícone '${icons[gameStatus.index]}' venceu a partida! Deseja iniciar uma nova partida?`)

            if (startNewGame) {
                game.reset()
                updateGameBoard(game, $gameBoard)
                gameStatus = game.getStatus()
            }

            return
        }

        try {
            game.peoplePlay(command.index)
            game.botPlay()
        } catch(error) {
            alert(error.message)
            return
        }

        updateGameBoard(game, $gameBoard)

        gameStatus = game.getStatus()

        if (gameStatus.type === "finished-victory") {
            const startNewGame = confirm(`O jogador do ícone '${icons[gameStatus.index]}' venceu a partida! Deseja iniciar uma nova partida?`)

            if (startNewGame) {
                game.reset()
                updateGameBoard(game, $gameBoard)
                gameStatus = game.getStatus()
            }

            return
        }
    })
}

start()