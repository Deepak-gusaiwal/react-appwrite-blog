import React, { useState } from "react";
import { Button, Container, Input, RTE } from "./index";
import { useForm } from "react-hook-form";
import { postValidator } from "../config/formValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { bucketService } from "../services/bucket";
import { postService } from "../services/post";
import { useNavigate } from "react-router-dom";
import { addStorePost } from "../redux/postSlice";
const PostForm = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postValidator),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      featuredImage: post?.featuredImage || "",
      alt: post?.alt || "",
    },
  });
  const { userData } = useSelector((state) => state.userSliceReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/ /g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ""); // Remove any non-word characters (excluding hyphens)
  };

  //============form submit
  const formSubmit = async (data) => {
    setLoading(true);
    try {
      if (post) {
        //---------logic to updating the post
        //1. uploading the new image and deleting the old image
        const newImage = data.featuredImage[0]
          ? await bucketService.uploadFile(data.featuredImage[0])
          : null;

        //-now deleting the old image if the newone get uploaded
        if (newImage) {
          await bucketService.deleteFile(post.featuredImage);
        }
        //2.now updating the post data
        const updatedPost = await postService.updatePost(post.slug, {
          ...data,
          featuredImage: newImage ? newImage.$id : null,
        });

        updatedPost && navigate(`/post/${updatedPost.$id}`);
      } else {
        //---------logic to creating the post
        //1. upload image
        const image = data.featuredImage[0]
          ? await bucketService.uploadFile(data.featuredImage[0])
          : null;

        console.log("uploaded image is", image);
        //2. create post
        const post = await postService.createPost({
          ...data,
          featuredImage: image ? image.$id : null,
          userId: userData.$id,
        });
        if (post) {
          dispatch(addStorePost(post));
          navigate(`/post/${post.$id}`);
        }
      }
    } catch (error) {
      console.log(
        "Error At PostForm in creating/updating post ::",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <h1 className="font-bold text-center uppercase text-2xl">
        {post ? "Update" : "Add"} Post
      </h1>
      <form
        className="grid grid-cols-12 gap-4 "
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="col-span-12 sm:col-span-7">
          <Input
            register={register}
            onChange={(e) => {
              setValue("slug", generateSlug(e.target.value));
            }}
            errors={errors}
            type="text"
            placeholder="enter title"
            name="title"
            label="title"
          />
          <Input
            register={register}
            errors={errors}
            type="text"
            placeholder="enter slug"
            name="slug"
            label="slug"
            readOnly
          />

          <RTE
            register={register}
            errors={errors}
            placeholder="enter content"
            name="content"
            label="content"
            setValue={setValue}
            post={post}
          />
        </div>
        <div className="col-span-12 sm:col-span-5">
          <Input
            register={register}
            errors={errors}
            type="file"
            placeholder="enter title"
            name="featuredImage"
            label="featuredImage"
            accept="image/png,image,jpg,image/jpeg,image/gif"
          />
          <Input
            register={register}
            errors={errors}
            type="text"
            placeholder="enter alt"
            name="alt"
            label="alt"
          />
        </div>
        <div className="col-span-12 ">
          <Button loading={loading} type="submit">
            Add
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default PostForm;
