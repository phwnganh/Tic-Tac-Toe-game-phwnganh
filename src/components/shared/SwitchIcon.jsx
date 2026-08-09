import GreyXIcon from '../../../public/grey-icon-x.svg'
import GreyOIcon from '../../../public/grey-icon-o.svg'
import ShadowGreyXIcon from '../../../public/shadow-icon-x.svg'
import ShadowGreyOIcon from '../../../public/shadow-icon-o.svg'
const SwitchIcon = ({value, onChange}) => {
    const isXActive = value === "X"

    return (
        <div className={"p-2 rounded-xl flex items-center bg-slate-900"}>
            <button type={"button"}
            onClick={() => {
                onChange("X")
            }
            }
            className={`flex-1/2 flex justify-center rounded-xl py-2.5 w-full ${isXActive ? "bg-slate-300" : ""}`}
            aria-label={"X"}>
                <div className={"flex justify-center items-center w-8 h-8 shrink-0"}>
                    <img src={isXActive ? ShadowGreyXIcon : GreyXIcon} alt="X" />
                </div>
            </button>

            <button type={"button"}
            onClick={() => {
                onChange("O")
            }}
            className={`flex-1/2 flex justify-center rounded-xl py-2.5 w-full ${isXActive ? "" : "bg-slate-300"}`}
            aria-label={"O"}
            >
                <div className={"flex justify-center items-center w-8 h-8 shrink-0"}>
                    <img src={isXActive ? GreyOIcon : ShadowGreyOIcon} alt={"O"}/>
                </div>
            </button>
        </div>
    );
};

export default SwitchIcon;