import React, { useEffect, useRef } from "react";
import "./ScrollAnimationComponent.css"; // Import your CSS file for styling

const ScrollAnimationComponent: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const topPos = elementRef.current.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        // Check if the top of the element is within the viewport
        if (topPos < screenHeight) {
          elementRef.current.classList.add("animate__fadeInUp"); // Add your animation class
        }
      }
    };

    // Attach event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={elementRef} className='scroll-animation'>
      {/* Content of your component */}
      <h2>Title</h2>
      <p>Content...</p>
    </div>
  );
};

export default ScrollAnimationComponent;
