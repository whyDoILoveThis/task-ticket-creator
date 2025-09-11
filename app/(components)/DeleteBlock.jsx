"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnyLoader from "./SpinnyLoader";
import CustomPopupModal from "./CustomPopupModal";
import IconClose from "../(icons)/IconClose";

const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const [isModalVisisble, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModalForConfirmation = () => {
    setModalVisible(!isModalVisisble);
  };

  function handleToggleModal() {
    setModalVisible(!isModalVisisble);
  }

  const modalBody = () => {
    return (
      <div style={{ color: "#fbacac" }}>
        PLEASE MAKE ABSOLUTELY SURE YOU WANT TO PROCEED❗
      </div>
    );
  };

  const deleteTicket = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/Tickets/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
      setIsLoading(false);
    }
    setModalVisible(false);
  };
  return isLoading ? (
    <SpinnyLoader />
  ) : (
    <>
      <spam
        className="text-red-400 hover:cursor-pointer hover:text-red-200"
        onClick={showModalForConfirmation}
      >
        <IconClose />
      </spam>

      {isModalVisisble && (
        <CustomPopupModal
          heading="❗❗Irreversible❗❗"
          body={modalBody()}
          handleClose={() => handleToggleModal}
          handleDelete={() => deleteTicket}
        />
      )}
    </>
  );
};

export default DeleteBlock;
