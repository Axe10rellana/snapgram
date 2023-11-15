//appwrite
import { Models } from "appwrite";

//react-router
import { Link } from "react-router-dom";

//context
import { useUserContext } from "@/context/AuthContext";

//components
import { PostStats } from "./";

//types
type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  //hooks
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts?.map((post) => (
        <li className="relative min-w-80 h-80" key={post?.$id}>
          <Link className="grid-post_link" to={`/posts/${post?.$id}`}>
            <img
              className="pointer-events-none h-full w-full object-cover"
              src={post?.imageUrl2}
              alt="post"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  className="pointer-events-none h-8 w-8 rounded-full"
                  src={
                    post?.creator?.imageUrl2 ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                />
                <p className="line-clamp-1">{post?.creator?.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user?.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
