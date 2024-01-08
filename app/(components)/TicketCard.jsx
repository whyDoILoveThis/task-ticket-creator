"use client";

import React, { useState } from "react";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressBar from "./ProgressBar";
import StatusDisplay from "./StatusDisplay";
import Link from "next/link";
import SpinnyLoader from "./SpinnyLoader";
import { useRouter } from "next/navigation";

const TicketCard = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };

  const navigateToEditTicket = () => {
    setIsLoading(true);
    router.push(`/TicketPage/${ticket._id}`);
  };

  return (
    <div className="relative flex flex-col bg-card rounded-md shadow-lg p-3 m-2">
      <div className="flex justify-between mb-3 ">
        <PriorityDisplay priority={ticket.priority} />
        <div
          onClick={() => {
            navigateToEditTicket();
          }}
          className={isLoading ? "" : "edit-overlay"}
        ></div>
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <h4>{ticket.title}</h4>
      {isLoading ? (
        <SpinnyLoader />
      ) : (
        <>
          <hr className="h-px border-0 bg-page mb-2" />
          <p className="whitespace-pre-wrap">{ticket.description}</p>
          <div className="flex-grow"></div>
          <div className="flex mt-2">
            <div className="flex flex-col">
              <p className="text-xs my-1">
                {formatTimestamp(ticket.createdAt)}
              </p>
              <ProgressBar progress={ticket.progress} />
            </div>
            <div className="ml-auto flex items-end">
              <StatusDisplay status={ticket.status} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketCard;
