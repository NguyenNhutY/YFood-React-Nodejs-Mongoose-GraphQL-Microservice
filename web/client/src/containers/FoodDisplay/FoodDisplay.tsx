import React, { useState, useEffect, useMemo } from "react";
import "./foodDisplay.scss";
import { gql, useQuery } from "@apollo/client";
import FoodItem from "../../components/FoodItem/FoodItem";
import AnimateBox from "../../helpers/Animation/AnimateBox/AnimateBox";
import Pagination from "../../components/Pagination/Pagination";
import SortByPrice from "../../components/SortByPrice/SortByPrice";

// GraphQL Query
const FOOD_QUERY = gql`
  query {
    listFood {
      success
      message
      datas {
        _id
        name
        description
        price
        image
        category_id
      }
    }
  }
`;

interface FoodDisplayProps {
  category: string; // Nhận danh mục từ props
  searchName: string;
  excludeId?: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category, searchName, excludeId }) => {
  const { data, loading, error } = useQuery(FOOD_QUERY);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  console.log("Category is" + category)

  // Lọc danh sách theo category, searchName, và excludeId
  const filteredFoodList = useMemo(() => {
    if (!data?.listFood?.datas) return [];
    return data.listFood.datas.filter((item: any) => {
      const categoryMatch = category === "All" || item.category_id === category; // Sử dụng category_id
      const searchNameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
      const excludeMatch = excludeId ? item._id !== excludeId : true;
      return categoryMatch && searchNameMatch && excludeMatch;
    });
  }, [data, category, searchName, excludeId]);

  // Sắp xếp danh sách dựa trên `sortOrder`
  const sortedFoodList = useMemo(() => {
    if (sortOrder === "none") return filteredFoodList;
    return [...filteredFoodList].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [filteredFoodList, sortOrder]);

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFoodList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFoodList.length / itemsPerPage);

  // Xử lý sự kiện thay đổi sắp xếp
  const handleSortChange = (order: "asc" | "desc" | "none") => {
    setSortOrder(order);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (sortedFoodList.length === 0) {
    return <p>Không tìm thấy món ăn phù hợp.</p>;
  }

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-top">
        <h2>Top dishes near you</h2>
        <SortByPrice onSortChange={handleSortChange} />
      </div>
      <div className="food-display-list">
        {currentItems.map((item) => (
          <AnimateBox key={item._id}>
            <FoodItem
              _id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          </AnimateBox>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={setCurrentPage} />
    </div>
  );
};

export default FoodDisplay;
