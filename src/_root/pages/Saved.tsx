//appwrite
import { Models } from "appwrite";

//queries and mutations
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

//components
import { GridPostList, Loader } from "@/components/shared";

const Saved = () => {
  //hooks
  const { data: currentUser } = useGetCurrentUser();

  //variables
  const savePosts = currentUser?.save
    ?.map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl2: currentUser?.imageUrl2,
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          className="pointer-events-none invert-white"
          src="/assets/icons/save.svg"
          alt="edit"
          width={36}
          height={36}
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
