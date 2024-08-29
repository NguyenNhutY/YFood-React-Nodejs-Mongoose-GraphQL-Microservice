// src/components/CommentList.js
import React from "react";
import "./commentList.scss";

const CommentList = ({ comments }) => (
  <ul className='comment-list'>
    {comments.map((comment, index) => (
      <li key={index}>{comment}</li>
    ))}
  </ul>
);

export default CommentList;
