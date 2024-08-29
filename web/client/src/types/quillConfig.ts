export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["blockquote", "code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  history: {
    delay: 2000,
    maxStack: 500,
    userOnly: true,
  },
};

export const formats = [
  "header", // Headers (h1, h2, ... h6)
  "font", // Font type
  "size", // Font size
  "bold", // Bold text
  "italic", // Italic text
  "underline", // Underlined text
  "strike", // Strikethrough text
  "color", // Text color
  "background", // Background color
  "script", // Subscript and superscript
  "list", // Ordered list
  "bullet", // Unordered list
  "indent", // Indentation
  "align", // Text alignment
  "link", // Links
  "image", // Images
  "video", // Videos
  "blockquote", // Blockquotes
  "code-block", // Code blocks
  "hr", // Horizontal rules
  "emoji", // Emoji (if supported)
  "formula", // Math formulas (if supported)
  "mention", // Mentions (if supported)
  "direction", // Text direction (LTR, RTL)
  "clean", // Remove formatting
];
