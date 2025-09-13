"use client";
import AddProjectForm from "./(components)/AddProjectForm";
import TicketCard from "./(components)/TicketCard";
import DeleteProjBtn from "./(components)/DeleteProjBtn";
import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import SpinnyLoader from "./(components)/SpinnyLoader";
import TabsMenu from "./(components)/TabsMenu";
import { motion, AnimatePresence } from "framer-motion";
import ItsDropdown from "./(components)/ItsDropdown";
import IconFire from "./(icons)/IconFire";
import { RenderStatusOption } from "./(components)/TicketForm";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [activeTab, setActiveTab] = useState("tickets");
  const [openProjectId, setOpenProjectId] = useState(null);

  // filters state
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "done" | "started" | "not started"
  const [minPriority, setMinPriority] = useState(0); // 0..4
  const [searchText, setSearchText] = useState(""); // optional text search

  // scrollbar state
  const [allowScroll, setAllowScroll] = useState(false);

  // refs for each header button
  const buttonRefs = useRef({});
  // computed translate values per project id (negative px)
  const [translates, setTranslates] = useState({});

  // reusable filter function (pure)
  const applyFilters = (
    ticketsList = [],
    projectId,
    { status, minPriority, search }
  ) => {
    // normalize
    const s = (status || "all").toLowerCase();
    const minP = Number.isFinite(minPriority) ? Number(minPriority) : 0;
    const q = (search || "").trim().toLowerCase();

    return ticketsList
      .filter((t) => t.project === projectId) // always filter by project
      .filter((t) => {
        // priority filter (tickets with priority >= minPriority)
        if (typeof t.priority !== "number") return false;
        return t.priority >= minP;
      })
      .filter((t) => {
        // status filter
        if (s === "all") return true;
        return (t.status || "").toLowerCase() === s;
      })
      .filter((t) => {
        // text search across title/description if provided
        if (!q) return true;
        const hay = `${t.title || ""} ${t.description || ""}`.toLowerCase();
        return hay.includes(q);
      });
  };

  // clamp helper for the numeric input
  const clampPriority = (val) => {
    const n = Number(val);
    if (Number.isNaN(n)) return 0;
    if (n < 0) return 0;
    if (n > 5) return 5;
    return Math.trunc(n); // keep integer
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      // clamp a bit to avoid extreme slides
      const tx = moveLeft > 0 ? -moveLeft : 0;
      newT[p._id] = Math.max(tx, -400); // safety clamp
    });

    setTranslates(newT);
  };

  useLayoutEffect(() => {
    computeTranslates();
    const raf = requestAnimationFrame(() => computeTranslates());
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  // memoized filtered map per project for performance and correct hook usage
  const filteredMap = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      map[p._id] = applyFilters(tickets, p._id, {
        status: statusFilter,
        minPriority,
        search: searchText,
      });
    });
    return map;
  }, [tickets, projects, statusFilter, minPriority, searchText]);

  return (
    <div className="p-5 w-full flex flex-col justify-center items-center">
      <div
        ref={containerRef}
        className="w-fit flex flex-col items-center max-w-[1200px]"
      >
        <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "add" && <AddProjectForm refetchProjects={g} />}

        {activeTab !== "add" && (
          <ItsDropdown
            position="down"
            trigger={
              <button
                className="flex gap-1 items-center bg-gradient-to-br from-red-400 via-red-500 to-rose-500 px-4 py-1 font-semibold rounded-xl ml-4 mb-4"
                type="button"
              >
                Filter <span className="relative top-1">👇</span>{" "}
                {statusFilter && statusFilter !== "all" && `| ${statusFilter}`}{" "}
                {minPriority && minPriority >= 0 ? (
                  <span className="inline-flex">
                    {" | "}
                    <span className="relative top-1 ml-1">
                      {" "}
                      <IconFire />
                    </span>
                    {minPriority}
                  </span>
                ) : null}{" "}
                {searchText && searchText !== "" && `| ${searchText}`}
              </button>
            }
          >
            {/* Filters controls - kept visually compact and non-invasive */}
            <div className="w-full mb-10 flex flex-col gap-3">
              <span className="flex gap-1">
                <label className="text-sm text-white/70">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option className="bg-zinc-700" value="all">
                    All
                  </option>
                  {RenderStatusOption("not started", "⚪Not Started")}
                  {RenderStatusOption("started", "🟡Started")}
                  {RenderStatusOption("done", "🟢Done")}
                  {RenderStatusOption("on hold", "🟠On Hold")}
                  {RenderStatusOption("idea", "🟣Idea")}
                  {RenderStatusOption("critical", "🔴Critical")}
                </select>
              </span>
              <span className="flex gap-1">
                <label className="text-sm text-white/70">Min Priority</label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={1}
                  value={minPriority}
                  onChange={(e) =>
                    setMinPriority(clampPriority(e.target.value))
                  }
                  className="w-20 rounded-lg bg-white/5 px-3 py-2 text-sm text-white focus:outline-none"
                />
              </span>
              <span className="flex flex-col gap-1">
                <label className="text-sm text-white/70 ml-2 leading-none">
                  Search
                </label>
                <input
                  type="search"
                  placeholder="title or description..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white focus:outline-none"
                />
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setMinPriority(0);
                    setSearchText("");
                  }}
                  className="px-3 py-2 hover:opacity-90 rounded-lg bg-its-gradient-green-to-br text-sm font-bold absolute right-2 text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          </ItsDropdown>
        )}

        {isLoading ? (
          <SpinnyLoader />
        ) : (
          (activeTab === "tickets" || activeTab === "edit") && (
            <div className="w-full flex flex-col gap-10 items-center">
              {projects.map((project) => {
                const isOpen = openProjectId === project._id;
                const tx = translates[project._id] ?? 0;

                // use precomputed filtered tickets for this project
                const filteredTickets = filteredMap[project._id] || [];

                return (
                  <div
                    key={project._id}
                    className="relative flex flex-col items-center w-full"
                  >
                    {/* header / toggle */}
                    <motion.button
                      ref={(el) => (buttonRefs.current[project._id] = el)}
                      initial={false}
                      onClick={() => {
                        toggleProject(project._id);
                      }}
                      className="w-fit mb-3 flex gap-2 items-center overflow-hidden hover:!bg-white/10 border border-white/10 shadow-lg px-4 py-3 text-left rounded-2xl transition-colors duration-200"
                      animate={{
                        x: isOpen ? tx : 0,
                        backgroundColor: !isOpen
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(255,255,255,0.08)",
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.18,
                        ease: "easeOut",
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
                                projName={project.name}
                                refetchProjects={g}
                              />
                            )}
                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {filteredTickets.map((filteredTicket, i) => (
                                <TicketCard
                                  key={filteredTicket._id || i}
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
