import { Product } from "./product";

export interface Cart {
  numOfCartItems: number;
  cartId: string;
  data: Data
}
export interface Data {
  _id: string,
  products: CartProduct[],
  totalCartPrice: string,
}
export interface CartProduct {
  count: number,
  product: Product,
  price: number
}
