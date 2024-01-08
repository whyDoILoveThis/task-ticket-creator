"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SpinnyLoader from "./SpinnyLoader";
const TicketForm = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState(false);

  const EDITMODE = ticket._id === "new" ? false : true;

  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("📃form submit being handled");
    setIsLoading(true);
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      console.log("✔👍response PUT ok");

      if (!res.ok) {
        throw new Error("❌failed to update Ticket!!!!");
      }

      router.push("/");
      router.refresh();
    } else {
      setIsLoading(true);
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      console.log("✔👍response POST ok");

      if (!res.ok) {
        throw new Error("❌failed to create Ticket!!!!");
      }

      router.push("/");
      router.refresh();
    }
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }
  const [formData, setFormData] = useState(startingTicketData);

  return isLoading ? (
    <div className="flex justify-center items-center size-full">
      <SpinnyLoader />
    </div>
  ) : (
    <div className="flex justify-center mb-32">
      <form
        className="flex flex-col gap-3 w-2/3 "
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>
          {EDITMODE ? (
            <span className="text-orange-300">
              <span className="text-green-400">
                UPDATE:
                <br />
              </span>
              {ticket.title}
            </span>
          ) : (
            "Create Your Ticket"
          )}
        </h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">💻Hardware Problem</option>
          <option value="Software Problem">👨‍💻Software Problem</option>
          <option value="Project">⛏️Project</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="prority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="prority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="prority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="prority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="prority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">🛑Not Started</option>
          <option value="started">🏃‍♂️💨Started</option>
          <option value="done">🤘🎉Done</option>
        </select>
        <div className="flex justify-center">
          <input
            type="submit"
            className={`btn ${EDITMODE ? "btn-blu" : "btn-grn"} w-fit`}
            value={EDITMODE ? "UPDATE" : "Create Ticket"}
          />
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
