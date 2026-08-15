import GameStart from "./shared/GameStart.jsx";
import {useLocation, useOutletContext} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import {checkDrawLines, checkWinner} from "../utils/gameLogic.js";
import WinNotificationModal from "./shared/WinNotificationModal.jsx";
import LoseNotificationModal from "./shared/LoseNotificationModal.jsx";
import RoundTieNotificationModal from "./shared/RoundTieNotificationModal.jsx";

const GameSolo = () => {
    const {state} = useLocation()
    const { onOpenResetConfirmModal, registerResetHandler } = useOutletContext();
    const [isOpenWinNotificationModal, setIsOpenWinNotificationModal] = useState(false)
    const [isOpenLoseNotificationModal, setIsOpenLoseNotificationModal] = useState(false)
    const [isOpenRoundTieNotificationModal, setIsOpenRoundTieNotificationModal] = useState(false)
    const [winningLine, setWinningLine] = useState([])
    const [winningPlayer, setWinningPlayer] = useState(null)
    const handleOpenWinNotificationModal = () => {
        setIsOpenWinNotificationModal(true)
    }

    const handleOpenLoseNotificationModal = () => {
        setIsOpenLoseNotificationModal(true)
    }

    const handleOpenRoundTieNotificationModal = () => {
        setIsOpenRoundTieNotificationModal(true)
    }
    const player = state;
    const cpu = player === "X" ? "O" : "X"
    const [currentTurn, setCurrentTurn] = useState(player)
    const [board, setBoard] = useState(Array(9).fill(null));
    const [scores, setScores] = useState({
        player: 0,
        ties: 0,
        cpu: 0
    })
    const timeoutRef = useRef(null);

    const resetGame = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setBoard(Array(9).fill(null));
        setCurrentTurn(player);
        setWinningLine([])
        setWinningPlayer(null)
    }, [player]);

    const handleRestartGame = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setBoard(Array(9).fill(null));
        setCurrentTurn(player);
        setWinningLine([])
        setWinningPlayer(null)
        setScores({
            player: 0,
            ties: 0,
            cpu: 0
        })
    }

    const handleNextRound = () => {
        resetGame();

        setIsOpenWinNotificationModal(false)
        setIsOpenLoseNotificationModal(false)
        setIsOpenRoundTieNotificationModal(false)
    }

    useEffect(() => {
        registerResetHandler(handleRestartGame);
        return () => registerResetHandler(() => {});
    }, [registerResetHandler, handleRestartGame]);

    const handleClickBoard = (index) => {
        if(board[index] !== null) return;

        if(currentTurn !== player) return;

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        const result = checkWinner(newBoard)

        if(result?.winner === player){
            setBoard(newBoard);
            setWinningLine(result?.lines)
            setWinningPlayer(result?.winner)
            setScores(prev => ({
                ...prev,
                player: prev.player + 1,
            }))
            handleOpenWinNotificationModal()
            return;
        }

        if(checkDrawLines(newBoard)){
            setScores(prev => ({
                ...prev,
                ties: prev.ties + 1,
            }))
            handleOpenRoundTieNotificationModal()
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

            const result = checkWinner(newBoard)

            if(result?.winner === cpu){
                setBoard(newBoard)
                setWinningLine(result?.lines)
                setWinningPlayer(result?.winner)
                setScores(prev => ({
                    ...prev,
                    cpu: prev.cpu + 1
                }))
                handleOpenLoseNotificationModal()
                timeoutRef.current = null;
                return;
            }

            if(checkDrawLines(newBoard)){
                setScores(prev => ({
                    ...prev,
                    ties: prev.ties + 1,
                }))
                handleOpenRoundTieNotificationModal()
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
        <GameStart isMultiplayer={false} onOpenResetConfirmModal={onOpenResetConfirmModal} currentPlayer={currentTurn} board={board} onClickBoard={handleClickBoard} winningLine={winningLine} winningPlayer={winningPlayer} scores={scores}/>
        {isOpenWinNotificationModal && <WinNotificationModal winnerTurn={currentTurn} isMultiplayer={false} onNextRound={handleNextRound}/>}
        {isOpenLoseNotificationModal && <LoseNotificationModal onNextRound={handleNextRound}/>}
        {isOpenRoundTieNotificationModal && <RoundTieNotificationModal onNextRound={handleNextRound}/>}
    </>
  );
};

export default GameSolo;
