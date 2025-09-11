"use client";
import AddProjectForm from "./(components)/AddProjectForm";
import TicketCard from "./(components)/TicketCard";
import DeleteProjBtn from "./(components)/DeleteProjBtn";
import { useEffect, useState } from "react";
import { set } from "mongoose";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const getTickets = async () => {
    const res = await fetch("/api/Tickets", {
      cache: "no-store",
    });
    return res.json();
  };

  const getProjects = async () => {
    const res = await fetch("/api/Projects", {
      cache: "no-store",
    });
    return res.json();
  };

  useEffect(() => {
    const g = async () => {
      setTickets((await getTickets()).tickets);
      setProjects((await getProjects()).projects);
    };
    g();
  }, []);

  console.log(tickets);

  return (
    <div className="p-5">
      <AddProjectForm />
      {projects?.map((project) => (
        <div key={project._id} className="mb-6">
          <span className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
            <DeleteProjBtn projId={project._id} />
          </span>
          {/* Tickets Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tickets
              .filter((t) => t.project === project._id) // 🔥 group tickets by project
              .map((filteredTicket, i) => (
                <TicketCard key={i} ticket={filteredTicket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
