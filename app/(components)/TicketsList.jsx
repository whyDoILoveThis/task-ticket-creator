"use client";
import React, { useState } from "react";
import TicketCard from "./TicketCard";

const TicketsList = ({ tickets, projectId, activeTab }) => {
  // 🔹 Filter states
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  // 🔹 Unified filtering
  const filteredTickets = tickets.filter((t) => {
    if (t.project !== projectId) return false;

    if (priorityFilter !== null && t.priority !== priorityFilter) return false;

    if (statusFilter !== null && t.status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 🎚️ Controls */}
      <div className="flex items-center gap-4 mb-4">
        {/* Priority number selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-white/70">Priority:</label>
          <input
            type="number"
            min={0}
            max={4}
            value={priorityFilter ?? ""}
            onChange={(e) =>
              setPriorityFilter(
                e.target.value === ""
                  ? null
                  : Math.max(0, Math.min(4, +e.target.value))
              )
            }
            className="w-16 p-1 rounded bg-white/10 text-white text-center"
          />
          <button
            onClick={() => setPriorityFilter(null)}
            className="px-2 py-1 rounded bg-red-500/70 hover:bg-red-500 text-xs"
          >
            Reset
          </button>
        </div>

        {/* Status dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-white/70">Status:</label>
          <select
            value={statusFilter ?? ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="p-1 rounded bg-white/10 text-white"
          >
            <option value="">All</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* 🎟️ Tickets */}
      {filteredTickets.map((ticket, i) => (
        <TicketCard key={i} activeTab={activeTab} ticket={ticket} />
      ))}

      {filteredTickets.length === 0 && (
        <p className="text-white/50 italic text-sm">No tickets match filters</p>
      )}
    </div>
  );
};

export default TicketsList;
