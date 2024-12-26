import React, { useState } from "react";
import NewsList from "../../containers/NewsList/NewsList";
import NewsForm from "../../components/NewsForm/NewsForm";
import { blogList, NewBlogPost, BlogPost } from "../../types/typesBlog";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/SearchNor/SearchNor";
import "./news.scss";
import AdSlider from "../../components/AdSlider/AdSlider";
import { assets } from "../../assets/frontend_assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(blogList);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(blogList);
  const blogsPerPage = 8;

  const handleAddBlog = (newBlog: NewBlogPost) => {
    const newBlogPost: BlogPost = {
      id: Date.now().toString(),
      ...newBlog,
      author: "Admin",
      date: new Date().toISOString(),
      comments: [],
    };
    setBlogs([newBlogPost, ...blogs]);
    setFilteredBlogs([newBlogPost, ...filteredBlogs]);
  };

  const handleSearchName = (name: string) => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <>
      <div>
        {" "}
        <button
          className='btn-back-history'
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faArrowUp} className='fontawe' />
        </button>
      </div>
      <div className='blog-container'>
        <div className='img-header-blog' />
        <h1>Blog</h1>

        <Search
          className='search-blog'
          setSearchName={handleSearchName}
          placeholder='Search for blogs...'
        />
        <br />
        <BlogList className='blog-list' blogs={currentBlogs} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={handlePaginate}
          />
        )}
        <BlogForm className='blog-form' onAddBlog={handleAddBlog} />
      </div>
      <AdSlider />
    </>
  );
};

export default BlogPage;
