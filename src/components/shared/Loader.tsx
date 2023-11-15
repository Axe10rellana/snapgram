const Loader = () => {
  return (
    <div className="flex-center w-full">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={24}
        height={24}
        className="pointer-events-none animate-spin"
      />
    </div>
  );
};

export default Loader;
