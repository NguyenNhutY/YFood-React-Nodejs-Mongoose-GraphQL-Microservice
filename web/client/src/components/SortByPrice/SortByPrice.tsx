import React from "react";
import "./sortByPrice.scss";

interface SortByPriceProps {
  sortOrder: "asc" | "desc" | "none";
  onSortChange: (order: "asc" | "desc" | "none") => void;
}

const SortByPrice: React.FC<SortByPriceProps> = ({
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className='sort-by-price'>
      <span>Sort by price:</span>
      <button
        className={`sort-button ${sortOrder === "asc" ? "active" : ""}`}
        onClick={() => onSortChange("asc")}
        aria-pressed={sortOrder === "asc"}
      >
        Ascending
      </button>
      <button
        className={`sort-button ${sortOrder === "desc" ? "active" : ""}`}
        onClick={() => onSortChange("desc")}
        aria-pressed={sortOrder === "desc"}
      >
        Descending
      </button>
      <button
        className={`sort-button ${sortOrder === "none" ? "active" : ""}`}
        onClick={() => onSortChange("none")}
        aria-pressed={sortOrder === "none"}
      >
        Clear
      </button>
    </div>
  );
};

export default SortByPrice;
