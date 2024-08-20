import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function fnModal(
  { children, headerTitle, btnCaption },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          dialog.current.showModal();
        },

        close() {
          dialog.current.close();
        },
      };
    },
    []
  );

  // Function to handle the escape key press
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      close(); //
    }
  };

  return createPortal(
    <dialog
      ref={dialog}
      className="bg-white backdrop:bg-stone-900/90 rounded shadow-md md:w-3/4 "
    >
       <div>{children}</div>
       
      <div className="grid grid-cols-2 ">
        <h3 className="text-xl font-semibold">{headerTitle}</h3>
        <form method="dialog" className=" text-right p-2">
          <button className="p-1 rounded bg-slate-200 hover:bg-slate-300 border border-slate-400 text-sm">
            {btnCaption}
          </button>
        </form>
      </div>

     
    </dialog>,

    document.getElementById("modal-root")
  );
});

export default Modal;
