import GameStart from "./shared/GameStart.jsx";
import {useLocation} from "react-router-dom";
import {useState} from "react";


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

        setCurrentTurn(cpu)
        handleAutomaticallyMoved(newBoard)

    }

    const handleAutomaticallyMoved = (currentBoard) => {
        const emptyCells = currentBoard.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);

        if(emptyCells.length === 0) return;

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        setTimeout(() => {
            setBoard(prevBoard => {
                const newBoard = [...prevBoard];
                newBoard[randomIndex] = cpu;

                return newBoard;
            })
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
