import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  const close = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLDivElement;
    const isBackdrop = t.id === 'backdrop';
    if (isBackdrop) onClose();
  };

  const content = isOpen && (
    <div
      id="backdrop"
      role="presentation"
      className="fixed inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black bg-opacity-50 py-6 px-16"
      onMouseDown={close}>
      <div
        className="relative flex flex-row justify-center rounded bg-white p-8"
        style={{ maxHeight: 'inherit', maxWidth: 'inherit' }}>
        {children}
      </div>
    </div>
    // <div role="alert" className="fixed inset-0 flex bg-black bg-opacity-50" onMouseDown={close}>
    //   <div
    //     className="flex h-full max-h-full w-full flex-col items-center justify-center overflow-hidden py-6 px-16"
    //     role="backdrop">
    //     <div className="relative flex max-h-full w-full flex-row ">
    //       <article className="relative flex h-full w-full flex-col ">
    //         <div
    //           role="backdrop"
    //           className="relative flex flex-row justify-center  rounded bg-white p-8"
    //           style={{ maxHeight: 'inherit', maxWidth: 'inherit' }}>
    //           {children}
    //         </div>
    //       </article>
    //     </div>
    //   </div>
    // </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return ReactDOM.createPortal(content, document.getElementById('portal')!);
};

export default Modal;
