//react-router-dom
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

//context
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

//queries and mutations
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

//constants
import { sidebarLinks } from "@/constants";

//types
import { INavLink } from "@/types";

//components
import { Button } from "@/components/ui";
import { Loader } from "./";

const LeftSidebar = () => {
  //react-router
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //hooks
  const { mutate: signOut } = useSignOutAccount();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  //functions
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link className="flex gap-3 items-center" to="/">
          <img
            className="pointer-events-none"
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        {isLoading || !user?.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link className="flex gap-3 items-center" to={`/profile/${user?.id}`}>
            <img
              className="pointer-events-none h-14 w-14 rounded-full"
              src={user?.imageUrl2 || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user?.name}</p>
              <p className="small-regular text-light-3">@{user?.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            //variables
            const isActive = pathname === link.route;

            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={link.label}
              >
                <NavLink
                  className="flex gap-4 items-center p-4"
                  to={link.route}
                >
                  <img
                    className={`pointer-events-none group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                    src={link.imgURL}
                    alt={link.label}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        className="shad-button_ghost"
        variant="ghost"
        onClick={(e) => handleSignOut(e)}
      >
        <img
          className="pointer-events-none"
          src="/assets/icons/logout.svg"
          alt="logout"
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
