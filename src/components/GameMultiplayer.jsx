import GameStart from "./shared/GameStart.jsx";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import {checkDrawLines, checkWinner} from "../utils/gameLogic.js";

const GameMultiplayer = () => {
    const {state} = useLocation()
    const [currentTurn, setCurrentTurn] = useState(state)
    const [board, setBoard] = useState(Array(9).fill(null))

    const handleClickBoard = (index) => {
        if(board[index] !== null) return;
        const newBoard = [...board]

        newBoard[index] = currentTurn
        setBoard(newBoard)

        const winner = checkWinner(newBoard)

        if(winner === currentTurn){
            console.log(`${currentTurn} WIN`);
            return;
        }

        if(checkDrawLines(newBoard)){
            console.log("DRAW");
            return;
        }
        setCurrentTurn(prevPlayer => prevPlayer === "X" ? "O" : "X")
    }
    return (
        <>
            <GameStart currentPlayer={state} board={board} onClickBoard={handleClickBoard}/>
        </>
    );
};

export default GameMultiplayer;