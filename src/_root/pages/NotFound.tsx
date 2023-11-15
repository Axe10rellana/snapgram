//react-router-dom
import { Link } from "react-router-dom";

//react-icons
import { FaExclamationCircle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="select-none bg-dark-1 w-full">
      <div className="flex flex-col items-center justify-center h-screen">
        <FaExclamationCircle className="text-6xl text-red-500 mb-4" />
        <h1 className="text-xl sm:text-4xl font-bold text-center text-light-1 mb-4">
          Sorry, this page isn't available.
        </h1>
        <div className="flex px-12 lg:px-0 items-center text-md sm:text-lg text-center">
          <p className="text-light-2">
            The link you followed may be broken, or the page may have been
            removed.{" "}
            <Link to="/" className="text-blue-500 hover:text-blue-400">
              Go back to Snapgram
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
