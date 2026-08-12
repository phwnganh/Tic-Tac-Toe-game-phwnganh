import { useCallback, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import ResetConfirmModal from "../components/shared/ResetConfirmModal.jsx";

const MainLayout = () => {
  const [openResetConfirmModal, setOpenResetConfirmModal] = useState(false);
  const resetHandlerRef = useRef(() => {});

  const handleOpenResetConfirm = useCallback(() => {
    setOpenResetConfirmModal(true);
  }, []);

  const handleCloseResetConfirm = useCallback(() => {
    setOpenResetConfirmModal(false);
  }, []);

  const handleResetGame = useCallback(() => {
    resetHandlerRef.current();
    setOpenResetConfirmModal(false);
  }, []);

  const registerResetHandler = useCallback((handler) => {
    resetHandlerRef.current = handler;
  }, []);

  const outletContext = useMemo(
    () => ({
      onOpenResetConfirmModal: handleOpenResetConfirm,
      registerResetHandler,
    }),
    [handleOpenResetConfirm, registerResetHandler]
  );

  return (
    <div className={"bg-slate-900 relative"}>
      <div
        className={
          "max-w-360 w-full mx-auto grid place-items-center min-h-screen"
        }
      >
        <div
          className={
            "max-w-360 w-full mx-auto grid place-items-center min-h-screen"
          }
        >
          <Outlet context={outletContext} />
        </div>
      </div>
      {openResetConfirmModal && (
        <ResetConfirmModal
          onCloseResetConfirmModal={handleCloseResetConfirm}
          onConfirmReset={handleResetGame}
        />
      )}
    </div>
  );
};

export default MainLayout;
