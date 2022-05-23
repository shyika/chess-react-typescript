import React, { FC, useState, useRef, useEffect } from 'react'
import { Colors } from '../models/Colors'
import { Player } from '../models/Player'

interface TimerProps {
    currentPlayer: Player | null,
    restart: () => void
}

const DEFAULT_TIME = 400

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [blackTime, setBlackTime] = useState(DEFAULT_TIME)
    const [whiteTime, setWhiteTime] = useState(DEFAULT_TIME)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer () {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const cb = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(cb, 1000)
    }
    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }
    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setWhiteTime(DEFAULT_TIME)
        setBlackTime(DEFAULT_TIME)
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <h3>Black: {blackTime}</h3>
            <h3>White: {whiteTime}</h3>
        </div>
    )
}

export default Timer