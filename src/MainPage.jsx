
import {useState} from "react";
import NewGameMenu from "./components/NewGameMenu.jsx";
const MainPage = () => {
    const [player, setPlayer] = useState("X")
    return (
        <div className={"bg-slate-900"}>
            <NewGameMenu player={player} setPlayer={setPlayer} />
        </div>
    );
};

export default MainPage;