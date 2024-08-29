import React from "react";
import "./infinite.scss";

interface TagListProps {
  tags: string[];
  duration: string;
  direction: "normal" | "reverse";
}

const TagList: React.FC<TagListProps> = ({ tags, duration, direction }) => (
  <div
    className='loop-slider'
    style={
      {
        "--duration": duration,
        "--direction": direction,
      } as React.CSSProperties
    }
  >
    <div className='inner'>
      {tags.map((tag, index) => (
        <div className='tag' key={index}>
          {tag}
        </div>
      ))}
      {/* duplicated content */}
      {tags.map((tag, index) => (
        <div className='tag' key={`duplicate-${index}`}>
          {tag}
        </div>
      ))}
    </div>
  </div>
);

const InfiniteScrollAnimation: React.FC = () => (
  <div className='app'>
    <div className='tag-list'>
      <TagList
        tags={[
          "YFood",
          "Order",
          "Favourite",
          "Your Life",
          "Your Choose",
          "Salad",
          "Cake",
          "Pure Veg",
          "Pasta",
          "Noodles",
          "Your Days",
          "Your Foods",
        ]}
        duration='15951ms'
        direction='normal'
      />
      <TagList
        tags={[
          "Menu",
          "Display",
          "Dishes",
          "Rolls",
          "Sandwich",
          "Deserts",
          "Cheaper",
          "Yum",
          "Healthy",
          "Ascending",
          "Chicken",
          "Bread",
          "Promotion",
        ]}
        duration='19260ms'
        direction='reverse'
      />
    </div>
  </div>
);

export default InfiniteScrollAnimation;
