"use client";
import AddProjectForm from "./(components)/AddProjectForm";
import TicketCard from "./(components)/TicketCard";
import DeleteProjBtn from "./(components)/DeleteProjBtn";
import { useEffect, useState } from "react";
import SpinnyLoader from "./(components)/SpinnyLoader";
import TabsMenu from "./(components)/TabsMenu";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [activeTab, setActiveTab] = useState("tickets"); // 🔥 track current tab

  const getTickets = async () => {
    setIsLoading(true);
    const res = await fetch("/api/Tickets", { cache: "no-store" });
    return res.json();
  };

  const getProjects = async () => {
    setIsLoading(true);
    const res = await fetch("/api/Projects", { cache: "no-store" });
    return res.json();
  };

  const g = () => setShouldFetch(!shouldFetch);

  const getProj = async () => {
    setTickets((await getTickets()).tickets);
    setProjects((await getProjects()).projects);
    setIsLoading(false);
  };

  useEffect(() => {
    g();
  }, []);

  useEffect(() => {
    getProj();
  }, [shouldFetch]);

  console.log(activeTab);

  return (
    <div className="p-5">
      {/* 🔥 Tabs Menu at top */}
      <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Show AddProjectForm only when Add tab is active */}
      {activeTab === "add" && <AddProjectForm refetchProjects={g} />}

      {isLoading ? (
        <SpinnyLoader />
      ) : activeTab === "tickets" ? (
        projects?.map((project) => (
          <div key={project._id} className="mb-6">
            <span className="text-3xl font-extrabold mb-2">{project.name}</span>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tickets
                .filter((t) => t.project === project._id)
                .map((filteredTicket, i) => (
                  <TicketCard
                    activeTab={activeTab}
                    key={i}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))
      ) : (
        activeTab === "edit" &&
        projects?.map((project) => (
          <div key={project._id} className="mb-6">
            <span className="flex gap-2 items-center mt-16">
              <span className="text-3xl font-extrabold mb-2">
                {project.name}
              </span>
              <DeleteProjBtn projId={project._id} refetchProjects={g} />
            </span>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tickets
                .filter((t) => t.project === project._id)
                .map((filteredTicket, i) => (
                  <TicketCard
                    activeTab={activeTab}
                    key={i}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
