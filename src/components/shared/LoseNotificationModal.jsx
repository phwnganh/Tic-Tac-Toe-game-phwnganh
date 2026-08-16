import OIcon from "../../../public/icon-o.svg";
import XIcon from "../../../public/icon-x.svg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDialogFocus } from "../../hooks/useDialogFocus";

const LoseNotificationModal = ({ loserTurn, onNextRound }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "bg-neutral-950/50 flex justify-center items-center fixed inset-0 z-50"
      }
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lose-modal-heading"
        className={
          "flex justify-center items-center flex-col h-67 w-full bg-slate-800"
        }
      >
        <h1
          id="lose-modal-heading"
          className={
            "uppercase text-preset-4 leading-preset-4 tracking-preset-4 font-preset-4 text-slate-300"
          }
        >
          Oh no, you lost ...
        </h1>
        <div className={"mt-4 flex flex-col gap-6"}>
          <div className={"flex items-center gap-6"}>
            <div
              className={"flex items-center justify-center w-16 h-16 shrink-0"}
            >
              <img src={loserTurn === "O" ? OIcon : XIcon} alt={"o-icon"} />
            </div>
            <h2
              className={`uppercase ${loserTurn === "O" ? "text-amber-400" : "text-teal-400"} text-preset-1 leading-preset-1 tracking-preset-1 font-preset-1`}
            >
              takes the round
            </h2>
          </div>

          <div className={"flex gap-4 justify-center"}>
            <button
              type={"button"}
              className={
                "shadow-[inset_0_-4px_0_0_#6B8997] rounded-xl bg-slate-300 p-4 uppercase text-slate-900 text-preset-4 leading-preset-4 tracking-preset-4 font-preset-4"
              }
              onClick={() => navigate("/")}
            >
              Quit
            </button>
            <button
              type={"button"}
              className={
                "shadow-[0_-8px_0_0_#10212A80,inset_0_-4px_0_0_#CC8B13] rounded-xl bg-amber-400 p-4 uppercase text-slate-900 text-preset-4 leading-preset-4 tracking-preset-4 font-preset-4"
              }
              onClick={onNextRound}
            >
              Next round
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoseNotificationModal;
