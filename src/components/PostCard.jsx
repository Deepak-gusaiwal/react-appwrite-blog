import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { bucketService } from "../services/bucket";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const { userData } = useSelector((state) => state.userSliceReducer);
  const { $id, title, content, alt, featuredImage } = post;
  const isAuther = post && userData?.$id === post?.userId ? true : false;
  const imagePreview = bucketService.getFilePreview(featuredImage);
  return (
    <div className="grid-item bg-gray-200 p-2 rounded shadow-md">
      <div>
        <div className="imgBox">
          <img src={imagePreview?.href} alt={alt} />
        </div>
        <h2>{title}</h2>
        <div>{ReactHtmlParser(content)}</div>

        <div className="flex gap-2">
          {isAuther && (
            <Link className="bg-yellow-500 rounded p-2" to={`/edit/${$id}`}>
              Edit
            </Link>
          )}

          <Link className="bg-green-500 rounded p-2" to={`/post/${$id}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
