/* eslint-disable react-hooks/rules-of-hooks */

//react-router-dom
import { Link, useNavigate, useParams } from "react-router-dom";

//sweetalert2
import Swal from "sweetalert2";

//context
import { useUserContext } from "@/context/AuthContext";

//queries and mutations
import {
  useDeletePost,
  useGetPostById,
  useGetUserPosts,
} from "@/lib/react-query/queriesAndMutations";

//utils
import { multiFormatDateString } from "@/lib/utils";

//components
import { GridPostList, Loader, PostStats } from "@/components/shared";
import { Button } from "@/components/ui";

//types
type UseParamsProps = {
  id: string;
};

const PostDetails = () => {
  //react-router
  const navigate = useNavigate();
  const { id } = useParams<UseParamsProps>();
  if (!id) return;

  //hooks
  const { user } = useUserContext();
  const { data: post, isPending } = useGetPostById(id);
  const { data: userPosts, isPending: isUserPostLoading } = useGetUserPosts(
    post?.creator?.$id
  );
  const { mutate: deletePost } = useDeletePost();

  //variables
  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  //functions
  const handleDeletePost = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to reverse this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete",
      });

      if (result.isConfirmed) {
        await deletePost({ postId: id, imageId: post?.imageId });
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the post. Please try again later.",
      });
    }
  };

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          className="shad-button_ghost"
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <img
            className="pointer-events-none"
            src="/assets/icons/back.svg"
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isPending || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            className="pointer-events-none post_details-img"
            src={post?.imageUrl2}
            alt="post"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                className="flex items-center gap-3"
                to={`/profile/${post?.creator?.$id}`}
              >
                <img
                  className="pointer-events-none rounded-full w-8 h-8 lg:w-12 lg:h-12"
                  src={
                    post?.creator?.imageUrl2 ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                />

                <div className="flex gap-1 flex-col">
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
              </Link>

              <div className="flex-center gap-4">
                <Link
                  className={`${user?.id !== post?.creator?.$id && "hidden"}`}
                  to={`/update-post/${post?.$id}`}
                >
                  <img
                    className="pointer-events-none"
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  className={`post_details-delete_btn ${
                    user?.id !== post?.creator?.$id && "hidden"
                  }`}
                  variant="ghost"
                  onClick={handleDeletePost}
                >
                  <img
                    className="pointer-events-none"
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags?.map((tag: string, index: string) => (
                  <li
                    className="text-light-3 small-regular"
                    key={`${tag}${index}`}
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user?.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-dark-4/80" />

        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
