"use client";
import React from "react";
import IconClose from "../(icons)/IconClose";
import CustomPopupModal from "./CustomPopupModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteProjBtn = ({ projId }) => {
  const router = useRouter();

  const [isModalVisisble, setModalVisible] = useState(false);

  const handleToggleModal = () => {
    setModalVisible(!isModalVisisble);
  };
  const deleteProject = async () => {
    try {
      const res = await fetch(`/api/Projects/${projId}`, {
        method: "DELETE",
      });

      return res.json();
    } catch (err) {
      console.error("Error deleting project:", err);
      throw err;
    } finally {
      router.refresh();
      setModalVisible(false);
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
      {isModalVisisble && (
        <CustomPopupModal
          heading="❗❗Irreversible❗❗"
          body={modalBody()}
          handleClose={handleToggleModal}
          handleDelete={deleteProject}
        />
      )}
    </div>
  );
};

export default DeleteProjBtn;
