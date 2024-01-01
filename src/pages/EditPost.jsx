import React from "react";
import { useParams } from "react-router-dom";
import { PostForm } from "../components";
import { useSelector } from "react-redux";

const EditPost = () => {
  const { slug } = useParams();
  const { allPosts } = useSelector((state) => state.postSliceReducer);

  const post = allPosts.find((p) => p.$id === slug);
  return post ? <PostForm post={post} /> : <h3>No Post Found</h3>;
};

export default EditPost;
