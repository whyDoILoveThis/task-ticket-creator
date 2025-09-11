"use client";

import React, { useState } from "react";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressBar from "./ProgressBar";
import StatusDisplay from "./StatusDisplay";
import SpinnyLoader from "./SpinnyLoader";
import { useRouter } from "next/navigation";
import IconEdit from "../(icons)/IconEdit";

const TicketCard = ({ activeTab, ticket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Date(timestamp).toLocaleString("en-US", options);
  };

  const navigateToEditTicket = () => {
    setIsLoading(true);
    router.push(`/TicketPage/${ticket._id}`);
  };

  return (
    <div
      className="group mt-2 relative flex flex-col rounded-2xl border border-white/10 
      bg-gradient-to-br from-white/[0.05] to-white/[0.02] 
      p-5 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <PriorityDisplay priority={ticket.priority} />

        {activeTab === "edit" ? (
          <div className="flex gap-4 items-center text-xl">
            <button onClick={navigateToEditTicket} type="button">
              <IconEdit />
            </button>
            <span className="flex items-center gap-2">
              {isLoading ? <SpinnyLoader /> : <DeleteBlock id={ticket._id} />}
            </span>
          </div>
        ) : null}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
        {ticket.title}
      </h3>

      {/* Description */}
      {!isLoading && (
        <>
          <p className="text-sm text-white/70 mb-4 line-clamp-3">
            {ticket.description}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-end justify-between gap-3">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] text-white/50">
                {formatTimestamp(ticket.createdAt)}
              </span>
              <ProgressBar progress={ticket.progress} />
            </div>
            <StatusDisplay status={ticket.status} />
          </div>
        </>
      )}
    </div>
  );
};

export default TicketCard;
