"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressBar from "./ProgressBar";
import StatusDisplay from "./StatusDisplay";
import SpinnyLoader from "./SpinnyLoader";
import { useRouter } from "next/navigation";
import IconEdit from "../(icons)/IconEdit";

const TicketCard = ({ activeTab, ticket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descRef = useRef(null);
  const router = useRouter();

  // detect truncation after mount
  useEffect(() => {
    const el = descRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [ticket.description]);

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
    <motion.div
      layout
      onClick={() => isTruncated && setIsExpanded(!isExpanded)}
      className={`group mt-2 relative flex flex-col rounded-2xl border border-white/10 
        bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 shadow-xl `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <PriorityDisplay priority={ticket.priority} />
        {activeTab === "edit" && (
          <div className="flex gap-4 items-center text-xl">
            <button onClick={navigateToEditTicket} type="button">
              <IconEdit />
            </button>
            <span className="flex items-center gap-2">
              {isLoading ? <SpinnyLoader /> : <DeleteBlock id={ticket._id} />}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
        {ticket.title}
      </h3>

      {/* Description with animation */}
      {!isLoading && (
        <AnimatePresence>
          <motion.p
            ref={descRef}
            className={`text-sm text-white/70 mb-4 ${
              !isExpanded ? "line-clamp-3" : ""
            }`}
            initial={false}
            animate={{ maxHeight: isExpanded ? 1000 : 64 }} // adjust 64 to approx line-clamp height
            exit={{ maxHeight: 64 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {ticket.description}
          </motion.p>
        </AnimatePresence>
      )}

      {/* Footer */}
      {!isLoading && (
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex mr-auto flex-col w-[50%]">
            <span className="text-[11px] text-nowrap text-white/50">
              {formatTimestamp(ticket.createdAt)}
            </span>
            <ProgressBar progress={ticket.progress} />
          </div>
          <span className="self-end">
            <StatusDisplay status={ticket.status} />
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default TicketCard;
