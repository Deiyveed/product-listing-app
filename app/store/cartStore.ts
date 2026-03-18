import { create } from "zustand";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  getTotalItems: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const existing = get().cart.find((item) => item.id === product.id);

    if (existing) {
      set({
        cart: get().cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...get().cart, { ...product, quantity: 1 }],
      });
    }
  },

  getTotalItems: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),
}));