import XIcon from "../../../public/icon-x.svg";
import OIcon from "../../../public/icon-o.svg";
import GreyXICon from "../../../public/grey-icon-x.svg";
import GreyOIcon from "../../../public/grey-icon-o.svg";
import ShadowOIcon from "../../../public/shadow-icon-o.svg";
import ShadowXIcon from "../../../public/shadow-icon-x.svg";
import OutlineOIcon from "../../../public/icon-o-outline.svg";
import OutlineXIcon from "../../../public/icon-x-outline.svg";
import ReturnICon from "../../../public/icon-restart.svg";
import { Fragment } from "react";
const GameStart = ({
  isMultiplayer,
  onOpenResetConfirmModal,
  currentPlayer,
  board,
  onClickBoard,
  winningLine = [],
  winningPlayer,
  scores,
}) => {
  const isCurrentTurn = currentPlayer === "O";
  return (
    <div className={"flex flex-col gap-5 max-w-115 w-full"}>
      <div className={"flex items-center justify-between"}>
        <div className={"flex gap-2 justify-center"}>
          <div
            className={"flex justify-center items-center w-7.5 h-7.5 shrink-0"}
          >
            <img src={XIcon} alt="" />
          </div>
          <div
            className={"flex justify-center items-center w-7.5 h-7.5 shrink-0"}
          >
            <img src={OIcon} alt="" />
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {isMultiplayer
            ? `Player ${currentPlayer}'s turn`
            : currentPlayer === "O"
              ? "Your turn, O"
              : "Your turn, X"}
        </div>

        <button
          type={"button"}
          aria-label={
            isMultiplayer
              ? `Player ${currentPlayer}'s turn`
              : currentPlayer === "O"
                ? "Your turn, O"
                : "Your turn, X"
          }
          className={
            "shadow-[inset_0_-4px_0_0_#10212A] uppercase max-w-35 w-full flex-1 py-2.5 sm:py-4 rounded-md sm:rounded-xl bg-slate-800 flex items-center justify-center gap-3"
          }
        >
          <div className={"flex justify-center items-center w-5 h-5 shrink-0"}>
            <img
              src={isCurrentTurn ? GreyOIcon : GreyXICon}
              alt={""}
            />
          </div>
          <span
            className={
              "text-slate-300 text-preset-5 sm:text-preset-4 leading-preset-5 sm:leading-preset-4 tracking-preset-5 sm:tracking-preset-4 font-preset-4"
            }
          >
            turn
          </span>
        </button>

        <button
          type={"button"}
          aria-label="Restart game"
          onClick={onOpenResetConfirmModal}
          className={
            "shadow-[inset_0_-4px_0_0_#6B8997] bg-slate-300 p-4 rounded-xl"
          }
        >
          <div className={"flex items-center justify-center w-5 h-5 shrink-0"}>
            <img src={ReturnICon} alt="" />
          </div>
        </button>
      </div>

      <div className={"grid grid-cols-3 gap-5"}>
        {Array.from({ length: 9 }, (_, index) => {
          const isWinningCell = winningLine.includes(index);
          const isOccupied = Boolean(board[index]);
          const cellLabel = isOccupied
            ? `Cell ${index + 1}, ${board[index]}`
            : `Cell ${index + 1}, empty`;

          return (
            <Fragment key={index}>
              <div className={"relative group w-full"}>
                <button
                  type={"button"}
                  onClick={() => onClickBoard(index)}
                  disabled={isOccupied}
                  aria-label={cellLabel}
                  className={`shadow-[0_-8px_0_0_#10212A80,inset_0_-8px_0_0_#10212A] w-full aspect-square rounded-2xl flex items-center justify-center ${isWinningCell ? (winningPlayer === "X" ? "bg-teal-400" : "bg-amber-400") : "bg-slate-800"} ${isOccupied ? "cursor-default opacity-100" : "cursor-pointer"}`}
                >
                  {board[index] ? (
                    <img
                      src={
                        isWinningCell
                          ? winningPlayer === "O"
                            ? ShadowOIcon
                            : ShadowXIcon
                          : board[index] === "O"
                            ? OIcon
                            : XIcon
                      }
                      alt={""}
                      className="w-16 h-16 shrink-0"
                    />
                  ) : (
                    <img
                      src={currentPlayer === "O" ? OutlineOIcon : OutlineXIcon}
                      alt=""
                      className="w-16 h-16 shrink-0 opacity-0 group-hover:opacity-100"
                    />
                  )}
                </button>
              </div>
            </Fragment>
          );
        })}
      </div>

      <div className={"flex gap-5 justify-between"}>
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`max-w-35 w-full rounded-2xl bg-teal-400 py-3 flex flex-col justify-center items-center`}
        >
          <p
            className={
              "uppercase text-slate-900 text-preset-5 leading-preset-5 tracking-preset-5 font-preset-5-medium"
            }
          >
            {isMultiplayer ? "X (P2)" : isCurrentTurn ? "O (You)" : "X (You)"}
          </p>
          <span
            className={
              "text-slate-900 text-preset-2 leading-preset-2 tracking-preset-2 font-preset-2"
            }
          >
            {isMultiplayer ? scores.x : scores.player}
          </span>
        </div>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={
            "max-w-35 w-full rounded-2xl bg-slate-300 py-3 flex flex-col justify-center items-center"
          }
        >
          <p
            className={
              "uppercase text-slate-900 text-preset-5 leading-preset-5 tracking-preset-5 font-preset-5-medium"
            }
          >
            Ties
          </p>
          <span
            className={
              "text-slate-900 text-preset-2 leading-preset-2 tracking-preset-2 font-preset-2"
            }
          >
            {scores.ties}
          </span>
        </div>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`max-w-35 w-full rounded-2xl bg-amber-400 py-3 flex flex-col justify-center items-center`}
        >
          <p
            className={
              "uppercase text-slate-900 text-preset-5 leading-preset-5 tracking-preset-5 font-preset-5-medium"
            }
          >
            {isMultiplayer ? "O (P1)" : !isCurrentTurn ? "O (CPU)" : "X (CPU)"}
          </p>
          <span
            className={
              "text-slate-900 text-preset-2 leading-preset-2 tracking-preset-2 font-preset-2"
            }
          >
            {isMultiplayer ? scores.o : scores.cpu}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameStart;
