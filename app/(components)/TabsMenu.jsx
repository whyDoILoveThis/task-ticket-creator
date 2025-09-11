"use client";

import { useState } from "react";

const TabsMenu = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "tickets", label: "🎫 Tickets" },
    { id: "edit", label: "✏️ Edit" },
    { id: "add", label: "➕ Add Project" },
  ];

  const handleTabClick = (id) => {
    onTabChange(id);
  };

  return (
    <div className=" mb-6 border-b border-white/20 pb-2">
      <span className="max-w-[650px] flex flex-wrap gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all
                ${
                  activeTab === tab.id
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
          >
            {tab.label}
          </button>
        ))}
      </span>
    </div>
  );
};

export default TabsMenu;
