"use client";
import AddProjectForm from "./(components)/AddProjectForm";
import TicketCard from "./(components)/TicketCard";
import DeleteProjBtn from "./(components)/DeleteProjBtn";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import SpinnyLoader from "./(components)/SpinnyLoader";
import TabsMenu from "./(components)/TabsMenu";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [activeTab, setActiveTab] = useState("tickets");
  const [openProjectId, setOpenProjectId] = useState(null);

  // scrollbar state
  const [allowScroll, setAllowScroll] = useState(false);

  // refs for each header button
  const buttonRefs = useRef({});
  // computed translate values per project id (negative px)
  const [translates, setTranslates] = useState({});

  const toggleProject = (id) => {
    setOpenProjectId(openProjectId === id ? null : id);
    setAllowScroll(false); // reset scroll each toggle
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
    setTickets((await getTickets()).tickets || []);
    setProjects((await getProjects()).projects || []);
    setIsLoading(false);
  };

  useEffect(() => {
    g();
  }, []);

  useEffect(() => {
    getProj();
  }, [shouldFetch]);

  const containerRef = useRef(null);

  const computeTranslates = () => {
    const gapPx = 16;
    const newT = {};

    const containerLeft = containerRef.current
      ? containerRef.current.getBoundingClientRect().left
      : 0;

    projects.forEach((p) => {
      const el = buttonRefs.current[p._id];
      if (!el) {
        newT[p._id] = 0;
        return;
      }

      const rect = el.getBoundingClientRect();
      const leftRelative = rect.left - containerLeft;
      const moveLeft = leftRelative - gapPx;

      newT[p._id] = moveLeft > 0 ? -moveLeft : 0;
    });

    setTranslates(newT);
  };

  useEffect(() => {
    setTimeout(() => {
      computeTranslates();
    }, 0);
  }, [openProjectId]);

  useLayoutEffect(() => {
    computeTranslates();
    const raf = requestAnimationFrame(() => computeTranslates());
    return () => cancelAnimationFrame(raf);
  }, [projects, openProjectId]);

  useEffect(() => {
    let r = null;
    const onResize = () => {
      r = requestAnimationFrame(() => computeTranslates());
      setOpenProjectId(null);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (r) cancelAnimationFrame(r);
    };
  }, [projects]);

  return (
    <div className="p-5 w-full flex flex-col justify-center items-center">
      <div ref={containerRef} className="w-fit max-w-[1200px]">
        <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "add" && <AddProjectForm refetchProjects={g} />}

        {isLoading ? (
          <SpinnyLoader />
        ) : (
          (activeTab === "tickets" || activeTab === "edit") && (
            <div className="w-full flex flex-col gap-10 items-center">
              {projects.map((project) => {
                const isOpen = openProjectId === project._id;
                const tx = translates[project._id] ?? 0;

                return (
                  <div
                    key={project._id}
                    className="relative flex flex-col items-center w-full"
                  >
                    {/* header / toggle */}
                    <motion.button
                      ref={(el) => (buttonRefs.current[project._id] = el)}
                      initial={false}
                      onClick={() => toggleProject(project._id)}
                      className="w-fit mb-3 flex gap-2 items-center overflow-hidden hover:!bg-white/10 border border-white/10 shadow-lg px-4 py-3 text-left rounded-2xl transition-colors duration-200"
                      animate={{
                        x: isOpen ? tx : 0,
                        backgroundColor: !isOpen
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(255,255,255,0.08)",
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.28,
                        ease: "easeInOut",
                      }}
                      style={{ willChange: "transform, background-color" }}
                    >
                      <div className="flex flex-col">
                        <span className="flex gap-2 items-center">
                          <span className="text-3xl font-bold">
                            {project.name}
                          </span>
                          <span
                            className={`translate-y-1 transform transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </span>
                        <span
                          className={`text-slate-300 transition-all duration-500 ${
                            isOpen
                              ? "max-h-20 max-w-96 opacity-100"
                              : "max-h-0 max-w-0 opacity-0"
                          }`}
                        >
                          {project.description}
                        </span>
                      </div>
                    </motion.button>

                    {/* dropdown */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          layout
                          initial={{ opacity: 0, maxHeight: 0 }}
                          animate={{ opacity: 1, maxHeight: 1000 }}
                          exit={{ opacity: 0, maxHeight: 0 }}
                          transition={{ duration: 0.45, ease: "easeInOut" }}
                          onAnimationComplete={() => {
                            // ✅ only allow scroll after expansion is complete
                            setAllowScroll(isOpen);
                          }}
                          className={`pb-4 w-full z-20 ${
                            allowScroll ? "overflow-y-auto" : "overflow-hidden"
                          } overflow-x-hidden`}
                          style={{ pointerEvents: "auto" }}
                        >
                          <div className="p-3">
                            {activeTab === "edit" && (
                              <DeleteProjBtn
                                projId={project._id}
                                refetchProjects={g}
                              />
                            )}
                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {tickets
                                .filter((t) => t.project === project._id)
                                .map((filteredTicket, i) => (
                                  <TicketCard
                                    key={i}
                                    activeTab={activeTab}
                                    ticket={filteredTicket}
                                  />
                                ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
