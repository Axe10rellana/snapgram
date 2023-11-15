//appwrite
import { Models } from "appwrite";

//react-router-dom
import { Link } from "react-router-dom";

//context
import { useUserContext } from "@/context/AuthContext";

//utils
import { multiFormatDateString } from "@/lib/utils";

//components
import { PostStats } from "@/components/shared";

//types
type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  //hooks
  const { user } = useUserContext();
  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post?.creator?.$id}`}>
            <img
              className="pointer-events-none rounded-full w-12 lg:h-12"
              src={
                post?.creator?.imageUrl2 ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post?.creator?.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post?.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post?.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          className={`${user?.id !== post?.creator?.$id && "hidden"}`}
          to={`/update-post/${post?.$id}`}
        >
          <img
            className="pointer-events-none"
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post?.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post?.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post?.tags?.map((tag: string, index: string) => (
              <li className="text-light-3 small-regular" key={`${tag}${index}`}>
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          className="pointer-events-none post-card_img"
          src={post?.imageUrl2 || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
        />
      </Link>

      <PostStats post={post} userId={user?.id} />
    </div>
  );
};

export default PostCard;
