import React, { useState } from "react";
import MarkdownPreview from "./MarkdownPreview";
import {
  useAddBlogMutation,
  useGetBlogsQuery,
} from "../../../../redux/features/api/blogApi";
import toast, { Toaster } from "react-hot-toast";
import Action from "./Action";

const AdminDashboardHome = () => {
  const [addBlog, setAddBlog] = useState(false);
  const [details, setDetails] = useState("");
  const {
    data: blogs,
    isError: bError,
    isLoading: bLoading,
    error: _error,
  } = useGetBlogsQuery() || {};

  const [createBlog, { data, isError, isLoading, isSuccess, error }] =
    useAddBlogMutation() || {};

  const scafolding = {
    title: "",
    image: "",
    shortContent: "",
  };

  const [formData, setFormData] = useState(scafolding);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    console.log({ ...formData, contents: { content: details } });
    createBlog({ ...formData, contents: { content: details } });
    toast.success("blog added");
    console.log(data);
  };
  return (
    <div className="bg-gray-800 min-h-screen text-gray-50">
      <div className="flex gap-4 items-center">
        <button onClick={() => setAddBlog(!addBlog)}>Add Blog</button>
        <button onClick={() => setAddBlog(!addBlog)}>all Blog</button>
      </div>

      {addBlog && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 max-w-screen-md mx-auto p-2 flex flex-col gap-3"
        >
          <input
            type="text"
            name="title"
            defaultValue={formData?.title}
            onChange={handleChange}
            className="p-3 border border-zin bg-transparent"
            id=""
            placeholder="Title"
          />
          <input
            type="text"
            name="image"
            defaultValue={formData?.image}
            onChange={handleChange}
            className="p-3 border border-zin bg-transparent"
            id=""
            placeholder="image"
          />
          <textarea
            type="text"
            name="shortContent"
            defaultValue={formData?.shortContent}
            onChange={handleChange}
            className="p-3 border border-zin bg-transparent"
            id=""
            placeholder="shortContent"
          />
          <textarea
            type="text"
            name="content"
            // defaultValue={formData?.contents.conent}
            // onChange={handleChange}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="p-3 border border-zin bg-transparent"
            id=""
            placeholder="content"
          />
          <button type="submit">submit</button>
        </form>
      )}
      <div>
        <MarkdownPreview details={details}> </MarkdownPreview>
      </div>

      {!addBlog && (
        <div>
          {blogs?.map((blg) => (
            <div key={blg?._id}>
              <h4>{blg?.title}</h4>
              {blg?._id}
              <div>
                <Action blog={blg} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardHome;
