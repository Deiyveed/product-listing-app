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
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
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

  removeFromCart: (id: number) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  increment: (id) => {
    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },

  decrement: (id) => {
    set({
      cart: get()
        .cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0), // remove if 0
    });
  },

  getTotalItems: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
}));
