"use client";
import React from "react";
import IconClose from "../(icons)/IconClose";
import CustomPopupModal from "./CustomPopupModal";
import { useState } from "react";
import SpinnyLoader from "./SpinnyLoader";

const DeleteProjBtn = ({ projId, refetchProjects }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalVisisble, setModalVisible] = useState(false);

  const handleToggleModal = () => {
    setModalVisible(!isModalVisisble);
  };
  const deleteProject = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/Projects/${projId}`, {
        method: "DELETE",
      });

      return res.json();
    } catch (err) {
      console.error("Error deleting project:", err);
      throw err;
    } finally {
      refetchProjects();
      setModalVisible(false);
      setIsDeleting(false);
    }
  };

  const modalBody = () => {
    return (
      <div style={{ color: "#fbacac" }}>
        PLEASE MAKE ABSOLUTELY SURE YOU WANT TO PROCEED❗
      </div>
    );
  };
  return (
    <div>
      <button
        onClick={handleToggleModal}
        className="mb-4 text-xl px-3 py-1 text-red-400 hover:text-red-700 transition"
      >
        <IconClose />
      </button>
      {isModalVisisble && !isDeleting ? (
        <CustomPopupModal
          heading="❗❗Irreversible❗❗"
          body={modalBody()}
          handleClose={handleToggleModal}
          handleDelete={deleteProject}
        />
      ) : (
        isModalVisisble && isDeleting && <SpinnyLoader />
      )}
    </div>
  );
};

export default DeleteProjBtn;
