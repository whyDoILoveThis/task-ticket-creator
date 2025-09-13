import React from "react";

const getDotColor = (status = "") => {
  switch (status.toLowerCase()) {
    case "not started":
      return "bg-its-gradient-neutral-to-br "; // ⚪
    case "started":
      return "bg-its-gradient-yellow-to-br"; // 🟡
    case "done":
      return "bg-its-gradient-green-to-br"; // 🟢
    case "on hold":
      return "bg-its-gradient-orange-to-br"; // 🟠
    case "idea":
      return "bg-its-gradient-purple-to-br"; // 🟣
    case "critical":
      return "bg-its-gradient-red-to-br"; // 🔴
    default:
      return "bg-its-gradient-slate-to-br"; // fallback
  }
};

const StatusDisplay = ({ status }) => {
  return (
    <span
      className="inline-flex text-nowrap items-center gap-2 rounded-full 
      bg-white/5 px-3 py-1 text-xs font-medium 
      text-white/80 border border-white/10"
    >
      <span
        className={`h-3 w-3 border border-slate-900 rounded-full ${getDotColor(
          status
        )}`}
      ></span>
      {status}
    </span>
  );
};

export default StatusDisplay;
