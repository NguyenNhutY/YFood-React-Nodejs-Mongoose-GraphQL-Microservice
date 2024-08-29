import React from "react";
import DOMPurify from "dompurify";

// Define the type for the props
interface SanitizedHTMLProps {
  data: string;
}

const SanitizedHTML: React.FC<SanitizedHTMLProps> = ({ data }) => {
  // Sanitize the HTML content
  const sanitizedHTML = DOMPurify.sanitize(data);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default SanitizedHTML;
