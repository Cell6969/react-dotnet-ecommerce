export type Cart = {
  cartId: string;
  items: Item[];
};

export type Item = {
  productId: number;
  name: string;
  price: number;
  url: string;
  brand: string;
  type: string;
  quantity: number;
};
