"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SpinnyLoader from "./SpinnyLoader";

const TicketForm = ({ ticket }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const EDITMODE = ticket && ticket._id !== "new";

  // starting data (filled with ticket when editing)
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData.title = ticket.title || "";
    startingTicketData.description = ticket.description || "";
    startingTicketData.priority = ticket.priority ?? 1;
    startingTicketData.progress = ticket.progress ?? 0;
    startingTicketData.status = ticket.status || "not started";
    startingTicketData.category = ticket.category || "Hardware Problem";
  }

  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const setPriority = (n) => {
    setFormData((prev) => ({ ...prev, priority: n }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = EDITMODE ? `/api/Tickets/${ticket._id}` : "/api/Tickets";
      const method = EDITMODE ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`Request failed: ${res.status} ${errText}`);
      }

      // success -> navigate home and refresh
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Ticket save error:", err);
      // show a basic alert — replace with your own toast
      alert("Failed to save ticket. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-gradient-to-br from-white/4 to-white/2 backdrop-blur-md border border-white/8 rounded-2xl p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              {EDITMODE ? "Update Ticket" : "Create Ticket"}
            </h2>
            <p className="text-sm text-white/60 mt-1">
              {EDITMODE ? `Editing: ${ticket.title}` : "Fill in the details below"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-white/80 ring-1 ring-white/6">
              <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none">
                <path d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {formData.category}
            </span>
            <div className="text-xs text-white/60">{formData.progress}%</div>
          </div>
        </div>

        {/* Title */}
        <label className="block text-xs font-medium text-white/70 mb-2">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/5 ring-1 ring-white/6 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/10"
          placeholder="Short descriptive title"
        />

        {/* Description */}
        <label className="block text-xs font-medium text-white/70 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/5 ring-1 ring-white/6 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/10"
          placeholder="Describe the issue or task in detail"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-white/70 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/6 text-white focus:outline-none"
            >
              <option>💻 Hardware Problem</option>
              <option>🧑‍💻 Software Problem</option>
              <option>⛏️ Project</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-white/70 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/6 text-white focus:outline-none"
            >
              <option value="not started">🛑 Not Started</option>
              <option value="started">🏃‍♂️ Started</option>
              <option value="done">🎉 Done</option>
            </select>
          </div>
        </div>

        {/* Priority pills */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-white/70 mb-2">Priority</label>
          <div className="inline-flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => {
              const selected = formData.priority === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPriority(n)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-all 
                    ${selected ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md" : "bg-white/3 text-white/80 hover:scale-[1.02]"}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-white/70 mb-2">Progress</label>

          <div className="flex items-center gap-4">
            <input
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              type="range"
              min="0"
              max="100"
              className="w-full accent-pink-400"
            />
            <div className="w-14 text-right text-sm font-medium text-white/80">{formData.progress}%</div>
          </div>

          <div className="w-full h-2 bg-white/6 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${formData.progress}%`, background: "linear-gradient(90deg,#ff7aa2,#ffb36b)" }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/6 flex items-center justify-between">
          <div className="text-sm text-white/60">Want to preview? Click the ticket after save.</div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg bg-transparent text-white/80 ring-1 ring-white/6 hover:bg-white/5 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={`px-5 py-2 rounded-lg text-white font-semibold transition 
                ${EDITMODE ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-green-400 to-teal-400"} 
                ${isLoading ? "opacity-70 cursor-not-allowed" : "shadow-md"}`}
            >
              {isLoading ? <span className="flex items-center gap-2"><SpinnyLoader /> Saving...</span> : (EDITMODE ? "Update Ticket" : "Create Ticket")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
