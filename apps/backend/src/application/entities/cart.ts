import { CartProducts } from "./cart-products";

export class Cart {
  shoppingCartId: string;
  userId: string;
  totalPrice: number;
  totalQuantity: number;
  products: CartProducts[];
}
