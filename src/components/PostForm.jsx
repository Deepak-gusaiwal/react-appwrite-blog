import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  ErrorTxt,
  FileInput,
  Input,
  RTE,
  Select,
} from "./index";
import { useDispatch, useSelector } from "react-redux";
import { bucketService } from "../services/bucket";
import { postService } from "../services/post";
import { useNavigate } from "react-router-dom";
import { addStorePost } from "../redux/postSlice";
const PostForm = ({ post }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    featuredImage: "",
    category: "",
    status: "",
    alt: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCustomSlug, setIsCustomrSlug] = useState(false);
  const [localPreviewImg, setLocalPreviewImg] = useState("");

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

  useEffect(() => {
    if (!isCustomSlug) {
      setFormData({ ...formData, slug: generateSlug(formData.title) });
    }
  }, [isCustomSlug]);
  // handdel input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && !isCustomSlug) {
      setFormData((prevData) => ({
        ...prevData,
        title: value,
        slug: generateSlug(value),
      }));
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //============form submit
  const formSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      slug,
      featuredImage,
      category,
      state,
      alt,
      metaTitle,
      metaKeywords,
      metaDescription,
    } = formData;
    setLoading(true);
    if (
      !title ||
      !slug ||
      !content ||
      !featuredImage ||
      !category ||
      !state ||
      !alt ||
      !metaTitle ||
      !metaKeywords ||
      !metaDescription ||
      title.length < 5 ||
      slug.length < 5
    ) {
      setError(true);
      setLoading(false);
      return;
    }

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
        console.log("calling create post");
        //1. upload image
        const image = formData.featuredImage[0]
          ? await bucketService.uploadFile(formData.featuredImage[0])
          : null;

        //2. create post
        const post = await postService.createPost({
          ...formData,
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

  const val = "hello this is the val";
  return (
    <Container>
      <h1 className="font-bold text-center uppercase text-2xl">
        {post ? "Update" : "Add"} Post
      </h1>
      <form className="grid grid-cols-12 gap-4 " onSubmit={formSubmit}>
        <div className="col-span-12 sm:col-span-7">
          <Input
            type="text"
            placeholder="enter title"
            label="title"
            value={formData.title}
            name="title"
            onChange={handleChange}
          />
          {error && !formData.title && <ErrorTxt>invalid Title</ErrorTxt>}
          {error && formData.title && formData.title.length < 4 && (
            <ErrorTxt>title length should be atleast 4</ErrorTxt>
          )}
          <Input
            placeholder="enter slug"
            label="slug"
            value={formData.slug}
            onChange={(e) => {
              isCustomSlug &&
                setFormData({
                  ...formData,
                  slug: generateSlug(e.target.value),
                });
            }}
            readOnly={!isCustomSlug}
            name="slug"
          />
          {error && !formData.slug && <ErrorTxt>invalid slug</ErrorTxt>}
          {error && formData.slug && formData.slug.length < 4 && (
            <ErrorTxt>slug length should be atleast 4</ErrorTxt>
          )}

          <div className="checkBox flex gap-2 items-center bg-yellow-100 px-2 ">
            <input
              onChange={(e) => {
                setIsCustomrSlug(e.target.checked);
              }}
              type="checkbox"
              id="customCheck"
              defaultChecked={isCustomSlug}
            />
            <label className="capitalize select-none" htmlFor="customCheck">
              custom Slug
            </label>
          </div>

          <RTE
            name="content"
            value={formData.content}
            onEditorChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            label="content"
          />
        </div>
        <div className="col-span-12 sm:col-span-5">
          {post && (
            <div className="w-full mb-4">
              <img
                src={bucketService.getFilePreview(post.featuredImage)}
                alt={post.alt}
                className="rounded-lg"
              />
            </div>
          )}
          {!post && localPreviewImg && (
            <div className="w-full mb-4">
              <img src={localPreviewImg} alt="" className="rounded-lg" />
            </div>
          )}
          <Input
            type="file"
            placeholder="Select Featured Image"
            label="Featured Image"
            value={formData.featuredImage}
            name="featuredImage"
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
          />
          {error && !formData.featuredImage && (
            <ErrorTxt>invalid featured image</ErrorTxt>
          )}
          <Input
            type="text"
            placeholder="enter alt"
            label="alt"
            value={formData.alt}
            name="alt"
            onChange={handleChange}
          />
          {error && !formData.alt && <ErrorTxt>invalid alt</ErrorTxt>}
          <Input
            type="text"
            placeholder="enter meta title"
            label="meta title"
            value={formData.metaTitle}
            name="metaTitle"
            onChange={handleChange}
          />
          {error && !formData.metaTitle && (
            <ErrorTxt>invalid meta title</ErrorTxt>
          )}
          <Input
            type="text"
            placeholder="enter meta keywords"
            label="meta keywords"
            value={formData.metaKeywords}
            name="metaKeywords"
            onChange={handleChange}
          />
          {error && !formData.metaKeywords && (
            <ErrorTxt>invalid meta keywords</ErrorTxt>
          )}
          <Input
            type="text"
            placeholder="enter meta description"
            label="meta description"
            value={formData.metaDescription}
            name="metaDescription"
            onChange={handleChange}
          />
          {error && !formData.metaDescription && (
            <ErrorTxt>invalid meta description</ErrorTxt>
          )}
          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-6 col-span-12">
              <Select
                label="status"
                value={formData.status}
                name="status"
                onChange={handleChange}
                options={["Active", "inActive"]}
              />
              {error && !formData.status && <ErrorTxt>invalid status</ErrorTxt>}
            </div>
            <div className="lg:col-span-6 col-span-12">
              <Select
                label="category"
                value={formData.category}
                name="category"
                onChange={handleChange}
                options={["popular", "best"]}
              />
              {error && !formData.category && (
                <ErrorTxt>invalid category</ErrorTxt>
              )}
            </div>
          </div>

          <Button loading={loading} type="submit">
            Add
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default PostForm;
