import React from "react";

const CustomPopupModal = ({
  heading,
  body,
  footer,
  handleClose = () => {},
  handleDelete = () => {},
}) => {
  return (
    <div id="customModal" className="modal__confirm-delete">
      <div onClick={handleClose()} className="space-close"></div>
      <div className="modal__confirm-delete--content">
        <div className="modal__confirm-delete--header">
          <h2 className="modal__confirm-delete--heading">
            {heading ? heading : "Heading"}
          </h2>
        </div>
        <section className="modal__confirm-delete--body">
          {body ? (
            body
          ) : (
            <div className="modal__confirm-delete--body-text">
              <p>
                This is the modal body. You can place any content you like in
                this area.
              </p>
            </div>
          )}
        </section>
        <footer className="modal__confirm-delete--footer">
          {footer ? (
            footer
          ) : (
            <div className="modal__confirm-delete--btn-wrap">
              <button onClick={handleDelete()} className="btn btn-red">
                delete
              </button>
              <button onClick={handleClose()} className="btn btn-grn">
                keep ticket
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default CustomPopupModal;
