export interface Review {
  id: number;
  rating: number; // Rating from 1 to 5
  comment: string;
  media?: string; // URL to image or video
  username: string; // Tên người dùng
}
export const customerReviewsData: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: "Excellent product! Highly recommended.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Alice",
  },
  {
    id: 2,
    rating: 4,
    comment: "Very good, but could be improved.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Bob",
  },
  {
    id: 3,
    rating: 3.5,
    comment: "It's okay, but not great.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Charlie",
  },
  {
    id: 4,
    rating: 2,
    comment: "Not satisfied with the quality.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "David",
  },
  {
    id: 5,
    rating: 4.5,
    comment: "Great value for money!",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Eva",
  },
  {
    id: 6,
    rating: 5,
    comment: "Fantastic experience, will buy again.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Frank",
  },
  {
    id: 7,
    rating: 3,
    comment: "Average product, nothing special.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Grace",
  },
  {
    id: 8,
    rating: 4,
    comment: "Good quality and fast delivery.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Hank",
  },
  {
    id: 9,
    rating: 2.5,
    comment: "Not worth the price.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Ivy",
  },
  {
    id: 10,
    rating: 4.8,
    comment: "Almost perfect, very happy with it.",
    media: "https://via.placeholder.com/150", // Example image URL
    username: "Jack",
  },
];
