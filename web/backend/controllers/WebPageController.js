import { Request, Response } from "express";
import { WebPage } from "../data/models/WebPage"; // Import mô hình WebPage

// Controller cho việc lấy tất cả các trang
export const getAllWebPages = async (req: Request, res: Response) => {
  try {
    const webPages = await WebPage.findAll();
    res.status(200).json(webPages);
  } catch (error) {
    console.error("Error fetching web pages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller cho việc lấy một trang theo ID
export const getWebPageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const webPage = await WebPage.findByPk(id);
    if (!webPage) {
      return res.status(404).json({ message: "Web page not found" });
    }
    res.status(200).json(webPage);
  } catch (error) {
    console.error("Error fetching web page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller cho việc tạo một trang mới
export const createWebPage = async (req: Request, res: Response) => {
  const { title, content, imageUrl, linkUrl, metadata } = req.body;

  try {
    const newWebPage = await WebPage.create({
      title,
      content,
      imageUrl,
      linkUrl,
      metadata,
    });
    res.status(201).json(newWebPage);
  } catch (error) {
    console.error("Error creating web page:", error);
    res.status(400).json({ message: "Bad request" });
  }
};

// Controller cho việc cập nhật một trang theo ID
export const updateWebPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, imageUrl, linkUrl, metadata } = req.body;

  try {
    const webPage = await WebPage.findByPk(id);
    if (!webPage) {
      return res.status(404).json({ message: "Web page not found" });
    }

    // Cập nhật thông tin trang
    await webPage.update({ title, content, imageUrl, linkUrl, metadata });
    res.status(200).json(webPage);
  } catch (error) {
    console.error("Error updating web page:", error);
    res.status(400).json({ message: "Bad request" });
  }
};

// Controller cho việc xóa một trang theo ID
export const deleteWebPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const webPage = await WebPage.findByPk(id);
    if (!webPage) {
      return res.status(404).json({ message: "Web page not found" });
    }

    await webPage.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting web page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
