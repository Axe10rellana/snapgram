/* eslint-disable react-hooks/exhaustive-deps */

//react
import { useEffect } from "react";

//react-router-dom
import { Link, useNavigate } from "react-router-dom";

//context
import { useUserContext } from "@/context/AuthContext";

//queries and mutations
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

//components
import { Button } from "@/components/ui";

const Topbar = () => {
  //react-router
  const navigate = useNavigate();

  //hooks
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  //useEffect
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link className="flex gap-3 items-center" to="/">
          <img
            className="pointer-events-none"
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            className="shad-button_ghost"
            variant="ghost"
            onClick={() => signOut()}
          >
            <img
              className="pointer-events-none"
              src="/assets/icons/logout.svg"
              alt="logout"
            />
          </Button>
          <Link className="flex-center gap-3" to={`/profile/${user?.id}`}>
            <img
              className="pointer-events-none h-8 w-8 rounded-full"
              src={user?.imageUrl2 || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
