import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import { bucketService } from "../services/bucket";
import ReactHtmlParser from "react-html-parser";
import { postService } from "../services/post";
import { deleteStorePost } from "../redux/postSlice";
const SinglePost = () => {
  const { slug } = useParams();
  const { allPosts } = useSelector((state) => state.postSliceReducer);
  const { userData } = useSelector((state) => state.userSliceReducer);
  const post = allPosts?.find((p) => p.slug === slug);
  const isAuther = post && userData?.$id === post.userId ? true : false;
  const image = post ? bucketService.getFilePreview(post.featuredImage) : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHanddler = async () => {
    try {
      const result = await postService.deletePost(post.$id);
      if (result) {
        dispatch(deleteStorePost(post.$id));
        navigate("/post");
      }
    } catch (error) {
      console.log("Failed to Delete Post at delteHanddler::", error.message);
    }
  };
  return post ? (
    <Container>
      <div className="max-w-[max(60vw,250px)] mx-auto">
        <img
          className="w-full h-full object-contain"
          src={image}
          alt={post.alt}
        />
      </div>
      <h2>{post.title}</h2>
      <div>{ReactHtmlParser(post.content)}</div>
      {isAuther && (
        <div className="flex gap-2">
          <Link
            className="bg-yellow-500 hover:bg-yellow-600 rounded p-2 capitalize"
            to={`/edit/${slug}`}
          >
            Edit
          </Link>
          <Button
            onClick={deleteHanddler}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      )}
    </Container>
  ) : (
    <h3>No Results Found</h3>
  );
};

export default SinglePost;
