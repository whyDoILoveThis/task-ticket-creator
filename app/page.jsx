"use client";
import AddProjectForm from "./(components)/AddProjectForm";
import TicketCard from "./(components)/TicketCard";
import DeleteProjBtn from "./(components)/DeleteProjBtn";
import { useEffect, useState } from "react";
import { set } from "mongoose";
import SpinnyLoader from "./(components)/SpinnyLoader";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const getTickets = async () => {
    setIsLoading(true);
    const res = await fetch("/api/Tickets", {
      cache: "no-store",
    });
    return res.json();
  };

  const getProjects = async () => {
    setIsLoading(true);
    const res = await fetch("/api/Projects", {
      cache: "no-store",
    });
    return res.json();
  };

  const g = () => {
    setShouldFetch(!shouldFetch);
  };

  const getProj = async () => {
    setTickets((await getTickets()).tickets);
    setProjects((await getProjects()).projects);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    g();
  }, []);

  useEffect(() => {
    getProj();
  }, [shouldFetch, g]);

  console.log(tickets);

  return (
    <div className="p-5">
      <AddProjectForm refetchProjects={g} />
      {isLoading ? <SpinnyLoader/> : projects?.map((project) => (
        <div key={project._id} className="mb-6">
          <span className="flex gap-2 items-center mt-16">
            <span className="text-3xl font-extrabold mb-2">{project.name}</span>
            <DeleteProjBtn projId={project._id} refetchProjects={g} />
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
