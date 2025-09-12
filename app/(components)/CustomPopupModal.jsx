import React from "react";

const CustomPopupModal = ({
  heading = "Heading",
  body = (
    <p className="text-white/80">
      This is the modal body. You can place any content you like in this area.
    </p>
  ),
  footer,
  handleClose = () => {},
  handleDelete = () => {},
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 
                   rounded-2xl shadow-2xl p-6 flex flex-col gap-5 animate-scaleUp"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">{heading}</h2>
          <button
            onClick={handleClose}
            className="text-white/50 hover:text-white transition"
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="text-white/70">{body}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-4">
          {footer ? (
            footer
          ) : (
            <>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl  hover:bg-red-600 text-white font-semibold transition"
              >
                Delete
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 hover:opacity-80 text-white font-semibold transition"
              >
                Keep
              </button>
            </>
          )}
        </div>
      </div>

      {/* Scale Animation */}
      <style jsx>{`
        @keyframes scaleUp {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleUp {
          animation: scaleUp 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomPopupModal;
