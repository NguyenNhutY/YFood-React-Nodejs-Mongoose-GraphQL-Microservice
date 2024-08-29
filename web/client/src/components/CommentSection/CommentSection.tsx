import React, { useContext, useState, ChangeEvent } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Comment, NewComment } from "../../types/typesBlog";
import "./commentSection.scss";
import SecurityInput from "../SecurityInput/SecurityInput";
import { StoreContext } from "../../context/StoreContext";

// Import các thư viện hỗ trợ
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Import hình ảnh xóa và hình ảnh thích từ thư mục assets
import { assets } from "../../assets/frontend_assets/assets";

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (newComment: NewComment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
}) => {
  const { extractForbiddenWords } = useContext(StoreContext);
  const [error, setError] = useState<string | null>(null);
  const [messageLength, setMessageLength] = useState<number>(0);
  const [charLimitExceeded, setCharLimitExceeded] = useState<boolean>(false);
  const [forbiddenWordsList, setForbiddenWordsList] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [likedComments, setLikedComments] = useState<number[]>([]); // State để theo dõi các comment đã thích
  const maxCharCount = 500;

  const validationSchema = Yup.object({
    content: Yup.string()
      .required("*")
      .test(
        "no-forbidden-words",
        "Comment contains forbidden words",
        (value) => {
          if (!value) return true;
          const forbiddenWordsInMessage = extractForbiddenWords(value);
          setForbiddenWordsList(forbiddenWordsInMessage);
          return forbiddenWordsInMessage.length === 0;
        }
      ),
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleLikeComment = (commentId: number) => {
    setLikedComments((prevLikes) =>
      prevLikes.includes(commentId)
        ? prevLikes.filter((id) => id !== commentId)
        : [...prevLikes, commentId]
    );
  };

  return (
    <div className='comment-section'>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div className='comments-list' key={comment.id}>
          <p className='comment'>
            <strong>{comment.author}</strong>: {comment.content}
            {/* Hiển thị hình ảnh và video nếu có */}
            {comment.files && comment.files.length > 0 && (
              <div className='comment-media'>
                {comment.files.map((file, index) => (
                  <div key={index} className='media-item'>
                    {file.type.startsWith("image/") && (
                      <div className='image-container'>
                        <img src={URL.createObjectURL(file)} alt='uploaded' />
                        <button
                          type='button'
                          className='btn-remove-file'
                          onClick={() => handleRemoveFile(index)}
                        >
                          <img src={assets.cross_icon} alt='remove' />
                        </button>
                      </div>
                    )}
                    {file.type.startsWith("video/") && (
                      <div className='video-container'>
                        <video controls>
                          <source src={URL.createObjectURL(file)} />
                        </video>
                        <button
                          type='button'
                          className='btn-remove-file'
                          onClick={() => handleRemoveFile(index)}
                        >
                          <img src={assets.cross_icon} alt='remove' />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <button
              type='button'
              className='btn-like'
              onClick={() => handleLikeComment(comment.id)}
            >
              <img
                src={
                  likedComments.includes(comment.id)
                    ? assets.favorite_filled_icon
                    : assets.favorite_icon
                }
                alt='like'
              />
              <span>
                {likedComments.includes(comment.id) ? "Liked" : "Like"}
              </span>
            </button>
          </p>
        </div>
      ))}
      <Formik
        initialValues={{ content: "" }}
        validationSchema={validationSchema}
        onSubmit={(
          values: NewComment,
          { resetForm }: FormikHelpers<NewComment>
        ) => {
          const forbiddenWords = extractForbiddenWords(values.content);
          if (forbiddenWords.length > 0) {
            setError(
              `Your comment contains forbidden words: ${forbiddenWords.join(
                ", "
              )}`
            );
          } else {
            onAddComment({ ...values, files });
            resetForm();
            setError(null);
            setMessageLength(0);
            setCharLimitExceeded(false);
            setForbiddenWordsList([]);
            setFiles([]); // Xóa danh sách tệp sau khi gửi
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className='add-comment'>
            <div>
              <label htmlFor='content'>Add a Comment</label>
              <Field
                name='content'
                as={SecurityInput} // Use SecurityInput instead of textarea
                type='textarea'
                id='content'
                placeholder='Write your comment here'
                className='message-input'
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  const value = e.target.value;
                  setFieldValue("content", value);
                  setMessageLength(value.length);
                  setCharLimitExceeded(value.length > maxCharCount);
                  const forbiddenWordsInMessage = extractForbiddenWords(value);
                  setForbiddenWordsList(forbiddenWordsInMessage);
                }}
              />
              <ErrorMessage name='content' component='div' className='error' />
              <div className='message-length'>
                Character count: {messageLength}/{maxCharCount}
              </div>
              {charLimitExceeded && (
                <div className='error char-limit-exceeded'>
                  You have exceeded the maximum character limit of{" "}
                  {maxCharCount} characters.
                </div>
              )}
              <div className='forbidden-words-list'>
                {forbiddenWordsList.length > 0 && (
                  <div className='error'>
                    <p>Forbidden words detected:</p>
                    <div className='forbidden-words-container'>
                      {forbiddenWordsList.map((word, index) => (
                        <span key={index} className='forbidden-word'>
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='upload-files-cmt'>
              <label htmlFor='uploaded-files-cmt'>Upload Files:</label>
              <input
                type='file'
                id='file-upload'
                multiple
                accept='image/*,video/*'
                onChange={handleFileChange}
              />
              <div className='uploaded-files-cmt'>
                {files.map((file, index) => (
                  <div key={index} className='file-item'>
                    {file.type.startsWith("image/") && (
                      <div className='image-container'>
                        <img src={URL.createObjectURL(file)} alt='uploaded' />
                        <button
                          type='button'
                          className='btn-remove-file'
                          onClick={() => handleRemoveFile(index)}
                        >
                          <img src={assets.cross_icon} alt='remove' />
                        </button>
                      </div>
                    )}
                    {file.type.startsWith("video/") && (
                      <div className='video-container'>
                        <video controls>
                          <source src={URL.createObjectURL(file)} />
                        </video>
                        <button
                          type='button'
                          className='btn-remove-file'
                          onClick={() => handleRemoveFile(index)}
                        >
                          <img src={assets.cross_icon} alt='remove' />
                        </button>
                      </div>
                    )}
                    <p>{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
            {error && <p className='error'>{error}</p>}
            <button type='submit'>Add Comment</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CommentSection;
