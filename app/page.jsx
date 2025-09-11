import AddProjectForm from "./(components)/AddProjectForm";
import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  const res = await fetch("http://localhost:3001/api/Tickets", {
    cache: "no-store",
  });
  return res.json();
};

const getProjects = async () => {
  const res = await fetch("http://localhost:3001/api/Projects", {
    cache: "no-store",
  });
  return res.json();
};

const Dashboard = async () => {
  const { tickets } = await getTickets();
  const { projects } = await getProjects();

  console.log(tickets);

  return (
    <div className="p-5">
      <AddProjectForm />
      {projects?.map((project) => (
        <div key={project._id} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
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
