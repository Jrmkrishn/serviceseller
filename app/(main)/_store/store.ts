import { CartItem, Customer, Receipt, Service } from "@/lib/types/service";
import { create } from "zustand";
import { v4 as uuid } from "uuid";

interface States {
    step: "cart" | "customer" | "payment" | "success";
    cartItems: CartItem[];
    saledItems: CartItem[];
    receipt: Receipt | null;
    addSaledItem: (saledItems: CartItem[]) => void;
    addCartItem: (service: Service) => void;
    updateQuantity: (serviceId: string, quantity: number) => void;
    removeCartItem: (id: string) => void;
    clearCart: () => void;
    handleCheckout: (customer: Customer, paymentMethod: "Credit Card" | "Upi" | "Cash") => void;
    changeStep: (stepData: "cart" | "customer" | "payment" | "success") => void;
}

export const useCartStore = create<States>((set) => ({
    step: "cart",
    cartItems: [],
    saledItems: [],
    receipt: null,

    addCartItem: (service) => set((prev) => {
        const existingItem = prev.cartItems.find((item) => item.service.id === service.id);
        if (existingItem) {
            return {
                cartItems: prev.cartItems.map((item) =>
                    item.service.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        }
        return {
            cartItems: [...prev.cartItems, { service, quantity: 1 }],
        };
    }),

    addSaledItem: (saledItems) => set((prev) => {
        const uniqueItems = saledItems.filter(
            (newItem) => !prev.saledItems.some((existingItem) => existingItem.service.id === newItem.service.id)
        );
        return {
            saledItems: [...prev.saledItems, ...uniqueItems],
        };
    }),

    updateQuantity: (serviceId, quantity) => set((prev) => {
        if (quantity <= 0) {
            return {
                cartItems: prev.cartItems.filter((item) => item.service.id !== serviceId),
            };
        }
        return {
            cartItems: prev.cartItems.map((item) =>
                item.service.id === serviceId ? { ...item, quantity } : item
            ),
        };
    }),

    removeCartItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter((i) => i.service.id !== id),
    })),

    clearCart: () => set(() => ({
        cartItems: [],
        receipt: null,
    })),

    handleCheckout: (customer, paymentMethod = "Credit Card") => set((state) => {
        const total = state.cartItems.reduce((sum, item) => sum + item.quantity * item.service.price, 0);
        const newReceipt: Receipt = {
            id: uuid(),
            date: new Date(),
            items: state.cartItems,
            customer,
            total,
            paymentMethod,
        };

        return {
            receipt: newReceipt,
            saledItems: [...state.saledItems, ...state.cartItems],
            cartItems: [],
        };
    }),

    changeStep: (stepData) => set(() => ({ step: stepData })),
}));
