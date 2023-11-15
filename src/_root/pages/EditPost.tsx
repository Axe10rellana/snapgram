//react-router
import { useParams } from "react-router-dom";

//queries and mutations
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";

//components
import PostForm from "@/components/forms/PostForm";
import { Loader } from "@/components/shared";

const EditPost = () => {
  //react-router
  const { id } = useParams();

  //hooks
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            className="pointer-events-none invert-white"
            src="/assets/icons/edit.svg"
            alt="edit"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        {isPending ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost;
