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
    const [scores, setScores] = useState({
        x: 0,
        ties: 0,
        o: 0,
    })

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

    const handleRestartGame = useCallback(() => {
        setBoard(Array(9).fill(null));
        setCurrentTurn(state);
        setGameOver(false)
        setWinningLine([])
        setScores({
            o: 0,
            ties: 0,
            x: 0
        })
    }, [state])

    const handleNextRound = () => {
        resetGame()
        setIsOpenWinNotificationModal(false)
        setIsOpenRoundTieNotificationModal(false)
    }

    useEffect(() => {
        registerResetHandler(handleRestartGame);
        return () => registerResetHandler(() => {});
    }, [registerResetHandler, handleRestartGame]);

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
            if(result.winner === "X"){
                setScores(prev => ({
                    ...prev,
                    x: prev.x + 1,
                }));
            } else {
                setScores(prev => ({
                    ...prev,
                    o: prev.o + 1,
                }));
            }
            handleOpenWinNotificationModal()
            setGameOver(true)
            return;
        }

        if(checkDrawLines(newBoard)){
            setScores(prev => ({
                ...prev,
                ties: prev.ties + 1,
            }));
            handleOpenRoundTieNotificationModal()
            setGameOver(true)
            return;
        }
        setCurrentTurn(prevPlayer => prevPlayer === "X" ? "O" : "X")
    }
    return (
        <>
            <GameStart isMultiplayer={true} scores={scores} onOpenResetConfirmModal={onOpenResetConfirmModal} currentPlayer={currentTurn} board={board} onClickBoard={handleClickBoard} winningLine={winningLine} winningPlayer={winner} />
            {isOpenWinNotificationModal && <WinNotificationModal winnerTurn={winner} isMultiplayer={true} onNextRound={handleNextRound}/>}
            {isOpenRoundTieNotificationModal && <RoundTieNotificationModal onNextRound={handleNextRound}/>}
        </>
    );
};

export default GameMultiplayer;