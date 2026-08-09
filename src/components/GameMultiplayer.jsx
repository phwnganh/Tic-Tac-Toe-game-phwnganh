import GameStart from "./shared/GameStart.jsx";
import {useLocation} from "react-router-dom";
import {useState} from "react";

const GameMultiplayer = () => {
    const {state} = useLocation()
    const [currentTurn, setCurrentTurn] = useState(state)
    const [board, setBoard] = useState(Array(9).fill(null))

    const handleClickBoard = (index) => {
        if(board[index] !== null) return;
        setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[index] = currentTurn;
            return newBoard;
        })
        setCurrentTurn(prevPlayer => prevPlayer === "X" ? "O" : "X")
    }
    return (
        <>
            <GameStart currentPlayer={state} board={board} onClickBoard={handleClickBoard}/>
        </>
    );
};

export default GameMultiplayer;