// frontend/src/store/cartStore.js (New)
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant = null) => {
        const { items } = get();
        const itemId = variant ? `${product.id}-${variant._id}` : product.id;
        const existingItem = items.find((item) => item.id === itemId);

        let newItems;
        if (existingItem) {
          newItems = items.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          const newItem = {
            id: itemId,
            productId: product.id,
            variantId: variant?._id || null,
            quantity: 1,
            details: {
              name: product.name,
              price: variant
                ? variant.price
                : product.base_price || product.price,
              image: variant?.images?.[0] || product.default_image,
              variantName: variant?.variant_name || null,
            },
          };
          newItems = [...items, newItem];
        }

        set({ items: newItems });
      },
      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },
      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (acc, item) => acc + item.details.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);

export default useCartStore;
