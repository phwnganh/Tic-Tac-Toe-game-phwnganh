
import NewGameMenu from "./components/NewGameMenu.jsx";
import {Routes, Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import GameSolo from "./components/GameSolo.jsx";
import GameMultiplayer from "./components/GameMultiplayer.jsx";
const MainPage = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<NewGameMenu />} />
                <Route path="new-game/solo" element={<GameSolo />} />
                <Route path="new-game/multiplayer" element={<GameMultiplayer />} />
            </Route>
        </Routes>
    );
};

export default MainPage;