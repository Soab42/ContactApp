/*=============================== 
Model Component
================================= */

import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="absolute top-0 grid h-screen w-screen place-items-center transition-colors bg-black/50">
            <div className="relative bg-white rounded-lg m-auto min-h-[200px] min-w-[80%] p-4">
              <div className="flex justify-end">
                <MdOutlineClose
                  onClick={onClose}
                  className="self-end text-2xl"
                />
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
