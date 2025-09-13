"use client";

import { useState, useRef, useEffect } from "react";

export default function ItsDropdown({
  trigger,
  children,
  position = "down-left",
  className = "",
  closeWhenItemClick = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Content click handler
  const handleContentClick = (e) => {
    if (!closeWhenItemClick) return;

    const target = e.target;
    if (!target) return;

    if (
      target.closest("input, textarea, select") ||
      target.closest(".no-close")
    ) {
      return;
    }

    setOpen(false);
  };

  // Position classes
  const positionClasses = {
    "down-left": "top-full left-0 mt-2 origin-top-left",
    "down-right": "top-full right-0 mt-2 origin-top-right",
    "up-left": "bottom-full left-0 mb-2 origin-bottom-left",
    "up-right": "bottom-full right-0 mb-2 origin-bottom-right",
    up: "bottom-full left-1/2 transform -translate-x-1/2 mb-2 origin-bottom",
    down: "top-full left-1/2 transform -translate-x-1/2 mt-2 origin-top",
    left: "top-1/2 right-full transform -translate-y-1/2 mr-2 origin-right",
    right: "top-1/2 left-full transform -translate-y-1/2 ml-2 origin-left",
  };

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>

      <div
        className={`
          absolute -translate-y-5 min-w-[10rem] w-72 rounded-xl shadow-lg backdrop-blur-md bg-opacity-60 bg-gray-900 border dark:border-gray-700 z-[999]
          transition-all duration-200 transform
          ${
            open
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }
          ${positionClasses[position]}
          ${className}
        `}
        role="menu"
      >
        <div className="p-2" onClick={handleContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
}
