import XIcon from "../../../public/icon-x.svg";
import OIcon from "../../../public/icon-o.svg";
import GreyXICon from "../../../public/grey-icon-x.svg";
import GreyOIcon from "../../../public/grey-icon-o.svg";
import ReturnICon from "../../../public/icon-restart.svg";
import {Fragment} from "react";
const GameStart = ({currentPlayer, board, onClickBoard}) => {
    const isCurrentTurn = currentPlayer === "O"

    return (
        <div className={"flex flex-col gap-5 max-w-115 w-full"}>
            <div className={"flex items-center justify-between"}>
                <div className={"flex gap-2 justify-center"}>
                    <div
                        className={"flex justify-center items-center w-7.5 h-7.5 shrink-0"}
                    >
                        <img src={XIcon} alt="XIcon" />
                    </div>
                    <div
                        className={"flex justify-center items-center w-7.5 h-7.5 shrink-0"}
                    >
                        <img src={OIcon} alt="OIcon" />
                    </div>
                </div>

                <button
                    type={"button"}
                    className={
                        "uppercase max-w-35 w-full flex-1 py-2.5 sm:py-4 rounded-md sm:rounded-xl bg-slate-800 flex items-center justify-center gap-3"
                    }
                >
                    <div className={"flex justify-center items-center w-5 h-5 shrink-0"}>
                        <img src={isCurrentTurn ? GreyOIcon : GreyXICon} alt={isCurrentTurn ? "GreyOIcon" : "GreyXICon"} />
                    </div>
                    <span
                        className={
                            "text-slate-300 text-preset-5 sm:text-preset-4 leading-preset-5 sm:leading-preset-4 tracking-preset-5 sm:tracking-preset-4 font-preset-4"
                        }
                    >
            turn
          </span>
                </button>

                <button type={"button"} className={"bg-slate-300 p-4 rounded-xl"}>
                    <div className={"flex items-center justify-center w-5 h-5 shrink-0"}>
                        <img src={ReturnICon} alt="ReturnICon" />
                    </div>
                </button>
            </div>

            <div className={"grid grid-cols-3 gap-5"}>
                {Array.from({ length: 9 }, (_, index) => (
                    <Fragment key={index}>
                        <div className={"relative"}>
                            <button type={"button"} onClick={() => onClickBoard(index)} className={"w-35 h-35 rounded-2xl bg-slate-800 flex items-center justify-center"}>
                                {board[index] && (
                                    <img src={board[index] === "O" ? OIcon : XIcon} alt={board[index]} className={"w-16 h-16 shrink-0"} />
                                )}
                            </button>
                        </div>
                    </Fragment>
                ))}
            </div>

            <div className={"flex gap-5 justify-between"}>
                <div className={"max-w-35 w-full rounded-2xl bg-teal-400 py-3 flex flex-col justify-center items-center"}>
                    <p className={"uppercase text-slate-900 text-preset-5 leading-preset-5 tracking-preset-5 font-preset-5-medium"}>X (You)</p>
                    <span className={"text-slate-900 text-preset-2 leading-preset-2 tracking-preset-2 font-preset-2"}>0</span>
                </div>

                <div className={"max-w-35 w-full rounded-2xl bg-slate-300 py-3 flex flex-col justify-center items-center"}>
                    <p className={"uppercase text-slate-900 text-preset-5 leading-preset-5 tracking-preset-5 font-preset-5-medium"}>Ties</p>
                    <span className={"text-slate-900 text-preset-2 leading-preset-2 tracking-preset-2 font-preset-2"}>0</span>
                </div>

                <div className={"max-w-35 w-full rounded-2xl bg-amber-400 py-3 flex flex-col justify-center items-center"}>
                    <p className={"uppercase text-slate-900 text-preset-5 leading-preset-5 tracking-preset-5 font-preset-5-medium"}>X (CPU)</p>
                    <span className={"text-slate-900 text-preset-2 leading-preset-2 tracking-preset-2 font-preset-2"}>0</span>
                </div>
            </div>
        </div>
    );
};

export default GameStart;