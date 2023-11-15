//react-router-dom
import { Link, useLocation } from "react-router-dom";

//constants
import { bottombarLinks } from "@/constants";

const Bottombar = () => {
  //react-router
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        //variables
        const isActive = pathname === link.route;

        return (
          <Link
            className={`${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transition`}
            key={link.label}
            to={link.route}
          >
            <img
              className={`pointer-events-none ${isActive && "invert-white"}`}
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
