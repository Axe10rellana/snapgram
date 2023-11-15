//queries and mutations
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

//components
import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard } from "@/components/shared";

const AllUsers = () => {
  //hooks
  const { toast } = useToast();
  const { data: creators, isPending, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All users</h2>
        {isPending && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li className="flex-1 min-w-[200px] w-full" key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
