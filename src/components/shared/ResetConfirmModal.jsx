
const ResetConfirmModal = ({ onCloseResetConfirmModal, onConfirmReset }) => {
  return (
    <div
      className={
        "bg-neutral-950/50 flex justify-center items-center fixed inset-0 z-50"
      }
    >
      <div
        className={
          "flex justify-center items-center gap-7.5 h-67 w-full bg-slate-800"
        }
      >
        <div className="flex flex-col gap-7.5">
          <h1
            className={
              "uppercase text-slate-300 text-preset-1 leading-preset-1 tracking-preset-1 font-preset-1"
            }
          >
            Restart game?
          </h1>
          <div className={"flex gap-4"}>
            <button
              type={"button"}
              className={
                "rounded-xl bg-slate-300 p-4 uppercase text-slate-900 text-preset-4 leading-preset-4 tracking-preset-4 font-preset-4"
              }
              onClick={onCloseResetConfirmModal}
            >
              No, cancel
            </button>
            <button
              type={"button"}
              className={
                "rounded-xl bg-amber-400 p-4 uppercase text-slate-900 text-preset-4 leading-preset-4 tracking-preset-4 font-preset-4"
              }
              onClick={onConfirmReset}
            >
              Yes, restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
