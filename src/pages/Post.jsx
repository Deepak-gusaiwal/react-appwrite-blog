import React from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";


const Post = () => {
  const { allPosts } = useSelector((state) => state.postSliceReducer);
  return (
    <Container>
      <h1 className="text-center font-semibold text-2xl capitalize mb-2">
        All Posts
      </h1>
      <div className="grid sm:grid-cols-4 gap-2 grid-cols-1">
        {allPosts ? (
          allPosts.map((post) => {
            return (
             <PostCard key={post.$id} post={post} />
            );
          })
        ) : (
          <h3 className="capitalize font-semibold">no posts found</h3>
        )}
      </div>
    </Container>
  );
};

export default Post;
