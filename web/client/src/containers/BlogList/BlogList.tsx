// src/components/BlogList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../../types/typesBlog";
import "./blogList.scss";
import { useParams } from "react-router-dom";

interface BlogListProps {
  blogs: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => (
  <div className='blog-list'>
    <h2>Blog Posts</h2>
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blog/${blog.id}`}>
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
            <img src={blog.image} alt='' />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default BlogList;
