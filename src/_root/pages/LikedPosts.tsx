//queries and mutations
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

//components
import { GridPostList, Loader } from "@/components/shared";

const LikedPosts = () => {
  //hooks
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {currentUser?.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser?.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
