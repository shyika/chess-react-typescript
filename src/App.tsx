import React, {useEffect, useState} from 'react';

import BoardComponent from './components/BoardComponent'
import Board from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';

import './App.css';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

function App() {
    const [board, setBoard] = useState(new Board())
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function swapPlayer () {
        setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer)
    }

    function restart () {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    return (
        <div className="app">
            <Timer
                currentPlayer={currentPlayer}
                restart={restart}
            />
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title="Lose black figures"
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title="Lose white figures"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
}

export default App;
