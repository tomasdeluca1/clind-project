export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className=" bg-black bg-opacity-50 flex items-center justify-center w-full h-full absolute top-0 left-0"></div>
      <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full h-full  md:w-3/6 md:h-auto md:max-h-[90vh] overflow-y-auto z-50">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
