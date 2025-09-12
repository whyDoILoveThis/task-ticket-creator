const ItsLoaderSpinSmall = ({ color = "" }) => {
  // Dynamically construct the class name based on the color
  const className =
    color && color !== "" && `loader-spin-small-${color.toLowerCase()}`;

  return <div className={`loader-spin-small ${className}`} />;
};

export default ItsLoaderSpinSmall;
