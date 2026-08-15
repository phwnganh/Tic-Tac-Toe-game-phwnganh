import GameStart from "./shared/GameStart.jsx";
import {useLocation, useOutletContext} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {checkDrawLines, checkWinner} from "../utils/gameLogic.js";
import WinNotificationModal from "./shared/WinNotificationModal.jsx";
import RoundTieNotificationModal from "./shared/RoundTieNotificationModal.jsx";

const GameMultiplayer = () => {
    const {state} = useLocation()
    const { onOpenResetConfirmModal, registerResetHandler } = useOutletContext();
    const [currentTurn, setCurrentTurn] = useState(state)
    const [winner, setWinner] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null))
    const [isOpenWinNotificationModal, setIsOpenWinNotificationModal] = useState(false)
    const [isOpenRoundTieNotificationModal, setIsOpenRoundTieNotificationModal] = useState(false)
    const [winningLine, setWinningLine] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const resetGame = useCallback(() => {
        setBoard(Array(9).fill(null));
        setCurrentTurn(state);
        setGameOver(false)
        setWinningLine([])
    }, [state]);

    useEffect(() => {
        registerResetHandler(resetGame);
        return () => registerResetHandler(() => {});
    }, [registerResetHandler, resetGame]);

    const handleOpenWinNotificationModal = () => {
        setIsOpenWinNotificationModal(true)
    }

    const handleOpenRoundTieNotificationModal = () => {
        setIsOpenRoundTieNotificationModal(true)
    }
    const handleClickBoard = (index) => {
        if(gameOver) return;
        if(board[index] !== null) return;
        const newBoard = [...board]

        newBoard[index] = currentTurn
        setBoard(newBoard)

        const result = checkWinner(newBoard)

        if(result?.winner){
            setBoard(newBoard)
            setWinner(result?.winner);
            setWinningLine(result?.lines)
            handleOpenWinNotificationModal()
            setGameOver(true)
            return;
        }

        if(checkDrawLines(newBoard)){
            handleOpenRoundTieNotificationModal()
            setGameOver(true)
            return;
        }
        setCurrentTurn(prevPlayer => prevPlayer === "X" ? "O" : "X")
    }
    return (
        <>
            <GameStart onOpenResetConfirmModal={onOpenResetConfirmModal} currentPlayer={currentTurn} board={board} onClickBoard={handleClickBoard} winningLine={winningLine} winningPlayer={winner} />
            {isOpenWinNotificationModal && <WinNotificationModal winnerTurn={winner} isMultiplayer={true}/>}
            {isOpenRoundTieNotificationModal && <RoundTieNotificationModal/>}
        </>
    );
};

export default GameMultiplayer;