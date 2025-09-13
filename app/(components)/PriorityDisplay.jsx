import IconFire from "../(icons)/IconFire";

const PriorityDisplay = ({ priority }) => {
  const maxPriority = 5; // total number of flames

  return (
    <div className="text-xl flex justify-start items-baseline">
      {Array.from({ length: maxPriority }).map((_, i) => (
        <span
          key={i}
          className={`pr-1 ${priority > i ? "text-red-400" : "text-slate-400"}`}
        >
          <IconFire />
        </span>
      ))}
    </div>
  );
};

export default PriorityDisplay;
