import React from "react";

const getDotColor = (status) => {
  switch (status.toLowerCase()) {
    case "done":
      return "bg-green-500";
    case "started":
      return "bg-yellow-400";
    case "not started":
      return "bg-red-500";
    default:
      return "bg-slate-400";
  }
};

const StatusDisplay = ({ status }) => {
  return (
    <span
      className="inline-flex text-nowrap items-center gap-2 rounded-full 
      bg-white/5 px-3 py-1 text-xs font-medium 
      text-white/80 ring-1 ring-white/10 "
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${getDotColor(status)}`}
      ></span>
      {status}
    </span>
  );
};

export default StatusDisplay;
