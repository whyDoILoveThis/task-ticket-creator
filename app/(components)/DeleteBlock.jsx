"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnyLoader from "./SpinnyLoader";
import CustomPopupModal from "./CustomPopupModal";

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
      <FontAwesomeIcon
        icon={faX}
        className="text-red-400 hover:cursor-pointer hover:text-red-200"
        onClick={showModalForConfirmation}
      />
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
