//appwrite
import { Models } from "appwrite";

//react-router-dom
import { Link } from "react-router-dom";

//components
import { Button } from "@/components/ui";

//types
type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link className="user-card" to={`/profile/${user?.$id}`}>
      <img
        className="pointer-events-none rounded-full w-14 h-14"
        src={user?.imageUrl2 || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user?.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user?.username}
        </p>
      </div>

      <Button className="shad-button_primary px-5" type="button" size="sm">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
