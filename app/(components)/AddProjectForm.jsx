"use client";
import React, { useState } from "react";

const AddProjectForm = ({ refetchProjects }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/Projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("❌ Failed to create project");

      setMessage("✅ Project created successfully!");
      setFormData({ name: "", description: "" });
    } catch (err) {
      setMessage(err.message || "❌ Something went wrong");
    } finally {
      refetchProjects();
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-white">➕ Add New Project</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-gray-300">
            Project Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded-lg bg-white/10 px-4 py-2 text-white 
                       focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter project name..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="rounded-lg bg-white/10 px-4 py-2 text-white 
                       focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Short description..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-gradient-to-r from-red-500 to-pink-500 
                     px-4 py-2 text-white font-semibold shadow-md 
                     hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "⏳ Creating..." : "🚀 Create Project"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProjectForm;
