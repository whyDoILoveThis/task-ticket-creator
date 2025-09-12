"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SpinnyLoader from "./SpinnyLoader";
import IconFire from "../(icons)/IconFire";
import ItsLoaderSpinSmall from "../../app/(components)/ItsLoaderSpinSmall";
import AddProjectForm from "./AddProjectForm";

const TicketForm = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const EDITMODE = ticket._id !== "new";
  const router = useRouter();

  const startingTicketData = {
    title: EDITMODE ? ticket.title : "",
    description: EDITMODE ? ticket.description : "",
    priority: EDITMODE ? ticket.priority : 1,
    progress: EDITMODE ? ticket.progress : 0,
    status: EDITMODE ? ticket.status : "not started",
    project: EDITMODE ? ticket.project?._id : "",
  };

  const [formData, setFormData] = useState(startingTicketData);

  // 🔹 Fetch projects from API
  useEffect(() => {
    setLoadingProjects(true);
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/Projects");
        if (!res.ok) throw new Error("❌ Failed to fetch projects");
        const data = await res.json();

        // 🔹 If your API returns { projects: [...] }
        setProjects(Array.isArray(data) ? data : data.projects || []);
      } catch (err) {
        console.error(err);
        setProjects([]); // fallback to empty array
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setLoadingProjects(false);
    }
  }, [projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = EDITMODE ? `/api/Tickets/${ticket._id}` : "/api/Tickets";
    const method = EDITMODE ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      body: JSON.stringify({ formData }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("❌ Ticket submission failed");

    router.push("/");
    router.refresh();
  };

  console.log("projects >>>>", projects);

  if (!isLoading && !loadingProjects && projects.length <= 0) {
    return (
      <div>
        <h1 className="text-center mt-8">
          You must create atleaste one project to make a ticket
        </h1>
        <AddProjectForm />
      </div>
    );
  }

  return isLoading ? (
    <div className="flex justify-center items-center h-full">
      <SpinnyLoader />
    </div>
  ) : (
    <div className="flex justify-center mb-32 mt-6 mx-4">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="w-full max-w-2xl rounded-2xl bg-white/5 backdrop-blur-xl 
        p-8 shadow-2xl border border-white/10 flex flex-col gap-6"
      >
        {/* Title */}
        <h3 className="text-2xl font-semibold text-white mb-2">
          {EDITMODE ? (
            <>
              <span className="text-red-400">Update Ticket:</span>{" "}
              <span className="text-white/80">{ticket.title}</span>
            </>
          ) : (
            "Create Your Ticket"
          )}
        </h3>

        {/* Input Fields */}
        <div className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-1">Title</label>
            <input
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="rounded-lg bg-white/10 px-4 py-2 text-white 
              focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-1">Description</label>
            <textarea
              name="description"
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
              className="rounded-lg bg-white/10 px-4 py-2 text-white 
              focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Project (Dynamic Categories) */}
          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-1">Project</label>
            {loadingProjects ? (
              <ItsLoaderSpinSmall />
            ) : (
              <select
                required
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="rounded-lg bg-white/10 px-4 py-2 text-white 
              focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">-- Select a Project --</option>
                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                    className="bg-slate-700"
                  >
                    📁 {project.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-2">Priority</label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((p) => (
                <label
                  key={p}
                  className={`mb-2 text-3xl flex items-center rounded-lg cursor-pointer
                  ${formData.priority >= p ? "text-red-400 " : "text-white/10"}
                  transition`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={formData.priority == p}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <IconFire />
                </label>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-1">Progress</label>
            <input
              type="range"
              name="progress"
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleChange}
              className="accent-red-400 cursor-pointer"
            />
            <span className="text-xs text-white/60 mt-1">
              {formData.progress}%
            </span>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-lg bg-white/10 px-4 py-2 text-white 
              focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option className="bg-slate-700" value="not started">
                🛑 Not Started
              </option>
              <option className="bg-slate-700" value="started">
                🏃‍♂️ Started
              </option>
              <option className="bg-slate-700" value="done">
                🎉 Done
              </option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className={`px-6 py-2 rounded-xl font-semibold transition 
            ${
              EDITMODE
                ? "bg-gradient-to-br from-red-400 via-red-500 to-rose-500 hover:opacity-80 text-white"
                : "bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 hover:opacity-80 text-white"
            }`}
          >
            {EDITMODE ? "Update Ticket" : "Create Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
