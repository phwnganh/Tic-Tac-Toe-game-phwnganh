import {Outlet} from 'react-router-dom'
const MainLayout = () => {
    return (
        <div className={"bg-slate-900"}>
            <div className={"max-w-360 w-full mx-auto grid place-items-center min-h-screen"}>
                <div className={"max-w-360 w-full mx-auto grid place-items-center min-h-screen"}>
                    <Outlet/>
                </div>

            </div>
        </div>

    );
};

export default MainLayout;