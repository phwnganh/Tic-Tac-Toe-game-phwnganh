import XIcon from '../../public/icon-x.svg'
import OIcon from '../../public/icon-o.svg'
import SwitchIcon from "./shared/SwitchIcon.jsx";
const NewGameMenu = ({player, setPlayer}) => {
    return (
        <div className={"max-w-360 w-full mx-auto grid place-items-center min-h-screen"}>
            <div className={"flex flex-col gap-8 sm:gap-10 max-w-115 w-full"}>
                <div className={"flex gap-2 justify-center"}>
                    <div className={"flex justify-center items-center w-7.5 h-7.5 shrink-0"}>
                        <img src={XIcon} alt="XIcon" />
                    </div>
                    <div className={"flex justify-center items-center w-7.5 h-7.5 shrink-0"}>
                        <img src={OIcon} alt="OIcon" />
                    </div>
                </div>
                <div className={"rounded-sm bg-slate-800 py-6 sm:py-5 px-6 flex flex-col gap-6"}>
                    <h1 className={"uppercase text-slate-300 text-preset-4 leading-preset-4 tracking-preset-4 font-preset-4 text-center"}>Pick player 1's mark</h1>
                    <SwitchIcon value={player} onChange={setPlayer}/>
                    <h2 className={"uppercase text-slate-300 text-preset-5 leading-preset-5 tracking-preset-5 font-preset-5-bold text-center"}>Remember: X goes first</h2>
                </div>
                <div className={"flex flex-col gap-4 sm:gap-5"}>
                    <button type={"button"} className={"uppercase shadow-[0_-8px_0_0_#1012A80] py-4 rounded-2xl bg-amber-400 text-slate-900 text-preset-3 leading-preset-3 tracking-preset-3 font-preset-3"}>New Game (vs CPU)</button>
                    <button type={"button"} className={"uppercase shadow-[0_-8px_0_0_#1012A80] py-4 rounded-2xl bg-teal-400 text-slate-900 text-preset-3 leading-preset-3 tracking-preset-3 font-preset-3"}>New Game (vs player)</button>
                </div>
            </div>

        </div>
    );
};

export default NewGameMenu;