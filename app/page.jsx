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
  const [openProjectId, setOpenProjectId] = useState(null);

  const toggleProject = (id) => {
    setOpenProjectId(openProjectId === id ? null : id); // 🔥 only one open
  };
  
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
      ) : ( activeTab === "tickets" ? projects.map((project) => {
        const isOpen = openProjectId === project._id;
        return (
          <div
            key={project._id}
            className="rounded-xl bg-white/5 shadow-md border border-white/10 overflow-hidden"
          >
            {/* 🔽 Header / Toggle Button */}
            <button
              onClick={() => toggleProject(project._id)}
              className="w-full flex justify-between items-center px-4 py-3 text-left
                         hover:bg-white/10 transition"
            >
              <span className="text-2xl font-bold">{project.name}</span>
              <div className="flex items-center gap-3">
                <DeleteProjBtn projId={project._id} refetchProjects={g} />
                <span
                  className={`transform transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
            </button>
            {/* 🔽 Dropdown Body */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tickets
                  .filter((t) => t.project === project._id)
                  .map((filteredTicket, i) => (
                    <TicketCard key={i} activeTab={activeTab} ticket={filteredTicket} />
                  ))}
              </div>
            </div>
          </div>
        );
      })
      ) : (
        activeTab === "edit" &&
        projects.map((project) => (
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
