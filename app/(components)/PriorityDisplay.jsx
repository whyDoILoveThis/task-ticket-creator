import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconFire from "../(icons)/IconFire";

const PriorityDisplay = ({ priority }) => {
  return (
    <div className="flex justify-start align-baseline">
      <span
        className={`pr-1 ${priority > 0 ? "text-red-400" : "text-slate-400"}`}
      >
        <IconFire />
      </span>
      <span
        className={`pr-1 ${priority > 1 ? "text-red-400" : "text-slate-400"}`}
      >
        <IconFire />
      </span>
      <span
        className={`pr-1 ${priority > 2 ? "text-red-400" : "text-slate-400"}`}
      >
        <IconFire />
      </span>
      <span
        className={`pr-1 ${priority > 3 ? "text-red-400" : "text-slate-400"}`}
      >
        <IconFire />
      </span>
      <span
        className={`pr-1 ${priority > 4 ? "text-red-400" : "text-slate-400"}`}
      >
        <IconFire />
      </span>
    </div>
  );
};

export default PriorityDisplay;
