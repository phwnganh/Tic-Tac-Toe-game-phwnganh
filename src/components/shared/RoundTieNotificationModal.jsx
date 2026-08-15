import {useNavigate} from "react-router-dom";

const RoundTieNotificationModal = () => {
    const navigate = useNavigate();
    return (
        <div className={
            "bg-neutral-950/50 flex justify-center items-center fixed inset-0 z-50"
        }>
            <div
                className={
                    "flex justify-center items-center gap-7.5 flex-col h-67 w-full bg-slate-800"
                }
            >
                <h1 className={"uppercase text-preset-1 leading-preset-1 tracking-preset-1 font-preset-1 text-slate-300"}>Round tied</h1>
                <div className={"flex gap-4 justify-center"}>
                    <button
                        type={"button"}
                        className={
                            "rounded-xl bg-slate-300 p-4 uppercase text-slate-900 text-preset-4 leading-preset-4 tracking-preset-4 font-preset-4"
                        }
                        onClick={() => navigate("/")}
                    >
                        Quit
                    </button>
                    <button
                        type={"button"}
                        className={
                            "rounded-xl bg-amber-400 p-4 uppercase text-slate-900 text-preset-4 leading-preset-4 tracking-preset-4 font-preset-4"
                        }
                    >
                        Next round
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoundTieNotificationModal;