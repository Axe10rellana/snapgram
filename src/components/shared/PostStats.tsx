/* eslint-disable react-hooks/exhaustive-deps */

//react
import React, { useEffect, useState } from "react";

//appwrite
import { Models } from "appwrite";

//react-router-dom
import { useLocation } from "react-router-dom";

//queries and mutations
import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";

//utils
import { checkIsLiked } from "@/lib/utils";

//types
type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  //react-router
  const location = useLocation();

  const likesList = post?.likes?.map((user: Models.Document) => user?.$id);

  //state variables
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  //hooks
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save?.find(
    (record: Models.Document) => record?.post?.$id === post?.$id
  );

  //useEffect
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  //functions
  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id, likesArray: newLikes });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord?.$id);
    }

    savePost({ postId: post?.$id || "", userId });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}
    >
      <div className="flex gap-2 mr-5">
        <img
          className="cursor-pointer"
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          className="cursor-pointer"
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          onClick={(e) => handleSavePost(e)}
        />
      </div>
    </div>
  );
};

export default PostStats;
