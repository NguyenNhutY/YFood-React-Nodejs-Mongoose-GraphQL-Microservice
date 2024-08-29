import React from "react";
import Card from "../Card";
import "./list.css";
const card = [
  {
    title: "Card 1",
    text: "Some text for Card 1",
    img: "image1.jpg",
    promoPrice: 20,
    origincalPrice: 30,
    rating: 5,
  },
  {
    title: "Card 2",
    text: "Some text for Card 2",
    img: "image2.jpg",
    promoPrice: 20,
    origincalPrice: 30,
    rating: 5,
  },
  {
    title: "Card 3",
    text: "Some text for Card 3",
    img: "image3.jpg",
    promoPrice: 20,
    origincalPrice: 30,
    rating: 5,
  },
  {
    title: "Card 4",
    text: "Some text for Card 4",
    img: "image4.jpg",
    promoPrice: 20,
    origincalPrice: 30,
    rating: 5,
  },
  {
    title: "Card 5",
    text: "Some text for Card 4",
    img: "image4.jpg",
    promoPrice: 20,
    origincalPrice: 30,
    rating: 5,
  },
  {
    title: "Card 6",
    text: "Some text for Card 4",
    img: "image4.jpg",
    promoPrice: 20,
    origincalPrice: 30,
    rating: 5,
  },
  {
    title: "Card 7",
    text: "Some text for Card 4",
    img: "image4.jpg",
    promoPrice: 20,
    origincalPrice: 30,
    rating: 5,
  },
];

const List = () => {
  return (
    <div className='list'>
      {card.map((item) => {
        console.log("Card in List ", item);
        return <Card card={item} />;
      })}
    </div>
  );
};

export default List;
