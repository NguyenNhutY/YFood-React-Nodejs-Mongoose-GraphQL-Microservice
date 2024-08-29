import { Request, Response } from "express";
import BlogPost from "../data/models/blogModel";
import Comment from "../data/models/commentModel";
// models.ts
export const addBlog = async (req, res) => {
  if (!Array.isArray(blogsArray) || blogsArray.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input: Expected an array of blog objects",
    });
  }

  try {
    for (const blogData of blogsArray) {
      const { title, content, _id, summary, date, image, likes, author } =
        blogData;

      if (!_id || !title || !content || !summary || !date || !image || !likes) {
        return res.status(400).json({
          success: false,
          message: "Invalid input: All fields are required",
        });
      }

      const blogPost = new BlogPost({
        title,
        content,
        _id,
        summary,
        date,
        author,
        image,
        likes,
      });

      await blogPost.save();
    }

    return res
      .status(201)
      .json({ success: true, message: "Blogs added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get all blog posts
export const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    return res.status(200).json(blogPosts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a blog post by ID
export const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    return res.status(200).json(blogPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a blog post
export const updateBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    return res.status(200).json(blogPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    return res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Add a comment to a blog post
export const addComment = async (req, res) => {
  try {
    const { author, content, date } = req.body;

    const comment = new Comment({
      author,
      content,
      blogPost: req.params.id,
      date,
    });

    await comment.save();

    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    blogPost.comments?.push(comment._id);
    await blogPost.save();

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Like a blog post
export const likeBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    blogPost.likes += 1;
    await blogPost.save();

    return res.status(200).json({ success: true, data: blogPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Dislike a blog post
export const dislikeBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    blogPost.likes -= 1;
    await blogPost.save();

    return res.status(200).json({ success: true, data: blogPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Paginate blog posts
export const paginateBlog = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;

  try {
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    if (
      isNaN(parsedPage) ||
      isNaN(parsedLimit) ||
      parsedLimit <= 0 ||
      parsedPage <= 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid query parameters" });
    }

    const blogs = await BlogPost.find({})
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    const total = await BlogPost.countDocuments({});

    return res.status(200).json({
      success: true,
      data: blogs,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get popular blog posts by likes and comments
export const getPopularBlogPosts = async (req, res) => {
  try {
    const popularBlogPosts = await BlogPost.find()
      .populate("comments")
      .sort({ likes: -1, comments: -1 })
      .limit(10);
    return res.status(200).json(popularBlogPosts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get blog posts by author
export const getBlogPostsByAuthor = async (req, res) => {
  try {
    const author = req.params.author;

    const blogPosts = await BlogPost.find({
      author: { $regex: new RegExp(author, "i") },
    });

    return res.status(200).json(blogPosts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Search blog posts
export const searchBlog = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";

    if (!searchQuery.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Search query cannot be empty" });
    }

    const blogs = await BlogPost.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { author: { $regex: searchQuery, $options: "i" } },
        { summary: { $regex: searchQuery, $options: "i" } },
      ],
    });

    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
