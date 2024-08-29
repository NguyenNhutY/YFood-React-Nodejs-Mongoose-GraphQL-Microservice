import React, { useState } from "react";
import IntroTour from "../Introjs/Introjs"; // Đường dẫn tương đối đến IntroTour
import "./introBtn.scss";

interface IntroTourButtonProps {
  steps: introJs.Step[]; // Assuming introJs.Step type is available in your type definitions
  className?: string;
}

const IntroTourButton: React.FC<IntroTourButtonProps> = ({
  steps,
  className = "",
}) => {
  const [showIntroTour, setShowIntroTour] = useState(false);

  const handleClick = () => {
    setShowIntroTour((prev) => !prev);
  };

  return (
    <>
      <button
        className={`intro-tour-button ${className}`}
        onClick={handleClick}
      >
        Guide
      </button>

      {showIntroTour && (
        <IntroTour
          steps={steps}
          onComplete={() => {
            console.log("Tour completed!");
            setShowIntroTour(false);
          }}
        />
      )}
    </>
  );
};

export default IntroTourButton;
