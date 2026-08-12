import GameStart from "./shared/GameStart.jsx";
import {useLocation, useOutletContext} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import {checkDrawLines, checkWinner} from "../utils/gameLogic.js";
import WinNotificationModal from "./shared/WinNotificationModal.jsx";
import LoseNotificationModal from "./shared/LoseNotificationModal.jsx";


const GameSolo = () => {
    const {state} = useLocation()
    const { onOpenResetConfirmModal, registerResetHandler } = useOutletContext();
    const [isOpenWinNotificationModal, setIsOpenWinNotificationModal] = useState(false)
    const [isOpenLoseNotificationModal, setIsOpenLoseNotificationModal] = useState(false)

    const handleOpenWinNotificationModal = () => {
        setIsOpenWinNotificationModal(true)
    }

    const handleOpenLoseNotificationModal = () => {
        setIsOpenLoseNotificationModal(false)
    }
    const player = state;
    const cpu = player === "X" ? "O" : "X"
    const [currentTurn, setCurrentTurn] = useState(player)
    const [board, setBoard] = useState(Array(9).fill(null));
    const timeoutRef = useRef(null);

    const resetGame = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setBoard(Array(9).fill(null));
        setCurrentTurn(player);
    }, [player]);

    useEffect(() => {
        registerResetHandler(resetGame);
        return () => registerResetHandler(() => {});
    }, [registerResetHandler, resetGame]);

    const handleClickBoard = (index) => {
        if(board[index] !== null) return;

        if(currentTurn !== player) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const winner = checkWinner(newBoard)

        if(winner === player){
            handleOpenWinNotificationModal()
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

        timeoutRef.current = setTimeout(() => {
            const newBoard = [...currentBoard]

            newBoard[randomIndex] = cpu;

            const winnerCPU = checkWinner(newBoard)

            if(winnerCPU === cpu){
                handleOpenLoseNotificationModal()
                setBoard(newBoard)
                timeoutRef.current = null;
                return;
            }

            if(checkDrawLines(newBoard)){
                console.log("DRAW");
                setBoard(newBoard)
                timeoutRef.current = null;
                return;
            }

            setBoard(newBoard)
            setCurrentTurn(player);
            timeoutRef.current = null;
        }, 500)
    }
  return (
    <>
        <GameStart onOpenResetConfirmModal={onOpenResetConfirmModal} currentPlayer={currentTurn} board={board} onClickBoard={handleClickBoard} />
        {isOpenWinNotificationModal && <WinNotificationModal winnerTurn={currentTurn} isMultiplayer={false}/>}
        {isOpenLoseNotificationModal && <LoseNotificationModal/>}
    </>
  );
};

export default GameSolo;
