import { Request, Response } from "express";
import MusicModel from "../data/models/musicModel"; // Điều chỉnh đường dẫn nếu cần

// Lấy tất cả bài hát
export const getAllMusic = async () => {
  try {
    const music = await MusicModel.find();
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: "Error fetching music", error });
  }
};

// Lấy bài hát theo ID
export const getMusicById = async () => {
  try {
    const music = await MusicModel.findById(req.params.id);
    if (!music) {
      return res.status(404).json({ message: "Music not found" });
    }
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: "Error fetching music", error });
  }
};

// Thêm bài hát mới
export const createMusic = async () => {
  try {
    const newMusic = new MusicModel(req.body);
    await newMusic.save();
    res.status(201).json(newMusic);
  } catch (error) {
    res.status(500).json({ message: "Error creating music", error });
  }
};

// Cập nhật bài hát
export const updateMusic = async () => {
  try {
    const updatedMusic = await MusicModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMusic) {
      return res.status(404).json({ message: "Music not found" });
    }
    res.status(200).json(updatedMusic);
  } catch (error) {
    res.status(500).json({ message: "Error updating music", error });
  }
};

// Xóa bài hát
export const deleteMusic = async () => {
  try {
    const music = await MusicModel.findByIdAndDelete(req.params.id);
    if (!music) {
      return res.status(404).json({ message: "Music not found" });
    }
    res.status(200).json({ message: "Music deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting music", error });
  }
};

// Tìm bài hát theo tiêu đề
export const getMusicByTitle = async () => {
  try {
    const { title } = req.query;
    const music = await MusicModel.find({
      title: { $regex: title, $options: "i" },
    });
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: "Error fetching music by title", error });
  }
};

// Lấy bài hát theo danh sách phát (playlist)
export const getMusicByPlaylists = async () => {
  try {
    const { playlistId } = req.query;
    const music = await MusicModel.find({ playlists: playlistId });
    res.status(200).json(music);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching music by playlists", error });
  }
};

// Đếm số lượng bài hát theo danh sách phát (playlist)
export const getMusicByPlaylistsCount = async () => {
  try {
    const { playlistId } = req.query;
    const count = await MusicModel.countDocuments({ playlists: playlistId });
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting music by playlists", error });
  }
};
