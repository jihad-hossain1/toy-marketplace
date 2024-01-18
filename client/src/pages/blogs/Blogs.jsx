import React from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../../redux/features/api/blogApi";
import { timeFormate } from "../../utils/timeFormate";

const Blogs = () => {
  const { data, isError, isLoading, error } = useGetBlogsQuery() || {};

  if (isError) return <div>{error?.message}</div>;

  return (
    <div className="min-h-[60vh]">
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            From the blog
          </h1>

          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            {isLoading ? (
              <div>Loading.....</div>
            ) : (
              data?.map((blog) => (
                <div key={blog?._id} className="lg:flex">
                  <img
                    className="object-cover w-full h-56 rounded-lg lg:w-64"
                    src={blog?.image}
                    alt=""
                  />

                  <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <Link
                      href="#"
                      className="text-xl font-semibold text-gray-800 hover:underline dark:text-white "
                    >
                      {blog?.title}
                    </Link>
                    <p>{blog?.shortContent}</p>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {timeFormate(blog?.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
