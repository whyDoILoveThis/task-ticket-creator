"use client";
import React from "react";
import IconClose from "../(icons)/IconClose";
import CustomPopupModal from "./CustomPopupModal";
import { useState } from "react";
import SpinnyLoader from "./SpinnyLoader";

const DeleteProjBtn = ({ projId, projName, refetchProjects }) => {
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
        <br />
        This can NOT be undone. Like, ever!
      </div>
    );
  };
  return (
    <>
      <button
        onClick={handleToggleModal}
        className="mb-4 text-sm px-3 py-0.5 border-2 rounded-xl bg-red-500/20 border-red-400 text-red-400 hover:text-red-700 transition"
      >
        DELETE
      </button>
      {isModalVisisble && !isDeleting ? (
        <CustomPopupModal
          heading={`DELETE ${projName}??`}
          body={modalBody()}
          handleClose={handleToggleModal}
          handleDelete={deleteProject}
        />
      ) : (
        isModalVisisble && isDeleting && <SpinnyLoader />
      )}
    </>
  );
};

export default DeleteProjBtn;
