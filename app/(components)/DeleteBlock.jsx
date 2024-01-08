"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnyLoader from "./SpinnyLoader";

const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteTicket = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://task-ticket-creator.vercel.app/api/Tickets/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.refresh();
      setIsLoading(false);
    }
  };
  return isLoading ? (
    <SpinnyLoader />
  ) : (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
