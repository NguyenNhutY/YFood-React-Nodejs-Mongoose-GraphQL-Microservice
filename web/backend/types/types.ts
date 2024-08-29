// Định nghĩa kiểu của FoodItem
export interface FoodItem {
  _id: string;
  name: string;

  price: number;
  image: string;
  detail: string;
  metail_1: string;
  metail_2: string;
  metail_3: string;
  description?: string;
  category?: string;
}

// Định nghĩa kiểu của CartItems
export interface CartItems {
  [key: string]: number;
}

// Định nghĩa kiểu của PromoCode
export interface PromoCode {
  code: string;
  discount: number;
  description: string;
  expiryDate: string;
}

// Định nghĩa kiểu cho state trong Redux
export interface StoreState {
  foodList: FoodItem[];
  cartItems: CartItems;
  favoriteItems: Set<string>;
  selectedItems: Set<string>;
  discount: number;
  promoError: string;
  promoCodes: PromoCode[];
}
