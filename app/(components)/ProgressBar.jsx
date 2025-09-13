const ProgressBar = ({ progress }) => {
  return (
    <div className="flex gap-1 items-center">
      <div className="w-full gap-1 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-red-400 via-red-500 to-rose-500 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span>{`${progress}%`}</span>
    </div>
  );
};

export default ProgressBar;
