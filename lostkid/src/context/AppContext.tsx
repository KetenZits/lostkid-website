"use client";

// ─────────────────────────────────────────────────────────────────────────────
// context/AppContext.tsx — Global state for cart, wishlist, and search
// Uses localStorage for persistence across sessions.
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type { CartItem, Product, ProductVariant, WishlistItem } from "@/types";

// ── Types ────────────────────────────────────────────────────────────────────

interface AppState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  isCartOpen: boolean;
}

type AppAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string; variantId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; variantId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; payload: WishlistItem }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "HYDRATE"; payload: Partial<AppState> };

interface AppContextValue {
  state: AppState;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string, variantId: string) => void;
  isWishlisted: (productId: string, variantId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  cartTotal: number;
  cartCount: number;
}

// ── Initial State ────────────────────────────────────────────────────────────

const initialState: AppState = {
  cart: [],
  wishlist: [],
  isCartOpen: false,
};

// ── Reducer ──────────────────────────────────────────────────────────────────

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload };

    case "ADD_TO_CART": {
      const existing = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.productId === action.payload.productId &&
            item.variantId === action.payload.variantId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.variantId === action.payload.variantId
            )
        ),
      };

    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(
            (item) =>
              !(
                item.productId === action.payload.productId &&
                item.variantId === action.payload.variantId
              )
          ),
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "TOGGLE_WISHLIST": {
      const isAlreadySaved = state.wishlist.some(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );
      return {
        ...state,
        wishlist: isAlreadySaved
          ? state.wishlist.filter(
              (item) =>
                !(
                  item.productId === action.payload.productId &&
                  item.variantId === action.payload.variantId
                )
            )
          : [...state.wishlist, action.payload],
      };
    }

    case "SET_CART_OPEN":
      return { ...state, isCartOpen: action.payload };

    default:
      return state;
  }
}

// ── Context & Provider ───────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lostkid_app_state");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppState>;
        dispatch({
          type: "HYDRATE",
          payload: {
            cart: parsed.cart ?? [],
            wishlist: parsed.wishlist ?? [],
          },
        });
      }
    } catch {
      // If localStorage is unavailable/corrupted, start fresh
    }
  }, []);

  // Persist cart and wishlist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        "lostkid_app_state",
        JSON.stringify({ cart: state.cart, wishlist: state.wishlist })
      );
    } catch {
      // silently ignore storage errors
    }
  }, [state.cart, state.wishlist]);

  // ── Derived State ────────────────────────────────────────────────────────────

  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.snapshot.price * item.quantity,
    0
  );
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  // ── Action Creators ──────────────────────────────────────────────────────────

  const addToCart = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      const cartItem: CartItem = {
        productId: product.id,
        variantId: variant.id,
        quantity,
        snapshot: {
          name: product.name,
          price: product.price + variant.priceDelta,
          color: variant.color,
          colorHex: variant.colorHex,
          image: variant.images[0],
        },
      };
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
      dispatch({ type: "SET_CART_OPEN", payload: true });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, variantId: string) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId, variantId } });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string, quantity: number) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, variantId, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleWishlist = useCallback((productId: string, variantId: string) => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: { productId, variantId } });
  }, []);

  const isWishlisted = useCallback(
    (productId: string, variantId: string) =>
      state.wishlist.some(
        (item) => item.productId === productId && item.variantId === variantId
      ),
    [state.wishlist]
  );

  const openCart = useCallback(
    () => dispatch({ type: "SET_CART_OPEN", payload: true }),
    []
  );
  const closeCart = useCallback(
    () => dispatch({ type: "SET_CART_OPEN", payload: false }),
    []
  );

  return (
    <AppContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        openCart,
        closeCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

// ── Named hook aliases for convenience ─────────────────────────────────────
export const useCart = useApp;
export const useWishlist = useApp;
