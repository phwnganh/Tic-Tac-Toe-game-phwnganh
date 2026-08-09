import GameStart from "./shared/GameStart.jsx";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import {checkDrawLines, checkWinner} from "../utils/gameLogic.js";


const GameSolo = () => {
    const {state} = useLocation()

    const player = state;
    const cpu = player === "X" ? "O" : "X"
    const [currentTurn, setCurrentTurn] = useState(player)
    const [board, setBoard] = useState(Array(9).fill(null));

    const handleClickBoard = (index) => {
        if(board[index] !== null) return;

        if(currentTurn !== player) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const winner = checkWinner(newBoard)

        if(winner === player){
            console.log("YOU WIN");
            return;
        }

        if(checkDrawLines(newBoard)){
            console.log("DRAW");
            return;
        }

        setCurrentTurn(cpu)
        handleAutomaticallyMoved(newBoard)

    }

    const handleAutomaticallyMoved = (currentBoard) => {
        const emptyCells = currentBoard.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);

        if(emptyCells.length === 0) return;

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        setTimeout(() => {
            const newBoard = [...currentBoard]

            newBoard[randomIndex] = cpu;

            const winnerCPU = checkWinner(newBoard)

            if(winnerCPU === cpu){
                console.log("YOU LOSE");
                setBoard(newBoard)
                return;
            }

            if(checkDrawLines(newBoard)){
                console.log("DRAW");
                setBoard(newBoard)
                return;
            }

            setBoard(newBoard)
            setCurrentTurn(player);
        }, 500)
    }
  return (
    <>
        <GameStart currentPlayer={currentTurn} board={board} onClickBoard={handleClickBoard} />
    </>
  );
};

export default GameSolo;
