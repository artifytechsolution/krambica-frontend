// "use client";
// import { UserData, UserState } from "@src/utils/types/authSliceTypes";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// const initialState: UserState = {
//   authToken: null,
//   userData: null,
// };

// export const authSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<UserData>) {
//       state.userData = action.payload;
//     },
//     removeUser(state) {
//       state.userData = null;
//     },
//     setAuthToken(state, action: PayloadAction<string | null>) {
//       state.authToken = action.payload;
//     },
//     removeAuthToken(state) {
//       state.authToken = null;
//     },
//   },
// });

// export const { setUser, removeUser, setAuthToken, removeAuthToken } =
//   authSlice.actions;

// export default authSlice.reducer;

// export const selectAuthToken = (state: RootState) =>
//   state?.app?.user?.authToken ?? null;

// export const selectUser = (state: RootState) =>
//   state?.app?.user?.userData ?? null;

//new code

"use client";
import { UserData, UserState } from "@src/utils/types/authSliceTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

//
// -------------------- AUTH SLICE --------------------
//
const initialState: UserState = {
  authToken: null,
  userData: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      console.log("innser set user----->");
      console.log(action.payload);
      state.userData = action.payload;
    },
    removeUser(state) {
      state.userData = null;
    },
    setAuthToken(state, action: PayloadAction<string | null>) {
      state.authToken = action.payload;
    },
    removeAuthToken(state) {
      state.authToken = null;
    },
  },
});

export const { setUser, removeUser, setAuthToken, removeAuthToken } =
  authSlice.actions;

export const selectAuthToken = (state: RootState) =>
  state?.app?.user?.authToken ?? null;

export const selectUser = (state: RootState) =>
  state?.app?.user?.userData ?? null;

//
// -------------------- CART SLICE --------------------
//
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
}

const initialCartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ==========================================
    // ADD TO CART REDUCER
    // ==========================================
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const payload = action.payload;

      console.log("==========================================");
      console.log("🛒 ADD TO CART REDUCER");
      console.log("==========================================");
      console.log("Received Payload:", JSON.stringify(payload, null, 2));

      // Validation
      if (
        !payload ||
        !payload.productId ||
        !payload.quantity ||
        !payload.size
      ) {
        console.warn("❌ Invalid payload for addToCart:", payload);
        return;
      }

      console.log("✅ Payload validation passed");

      // Ensure state.items is always an array
      if (!Array.isArray(state.items)) {
        console.warn("⚠️ state.items was not an array, resetting...");
        state.items = [];
      }

      // Clean up invalid items
      state.items = state.items.filter(
        (item) => item && typeof item === "object" && !Array.isArray(item)
      );

      console.log("📦 Current cart items:", state.items.length);

      // Check for existing item with same productId AND size
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === payload.productId && item.size === payload.size
      );

      console.log(
        `🔍 Looking for existing item with productId: ${payload.productId}, size: ${payload.size}`
      );

      if (existingItemIndex !== -1) {
        // Item with same productId and size exists, increment quantity
        const existingItem = state.items[existingItemIndex];
        const oldQuantity = existingItem.quantity;
        existingItem.quantity += payload.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;

        console.log(
          `📈 Item already in cart. Updated quantity: ${oldQuantity} → ${existingItem.quantity}`
        );
      } else {
        // New item, add to cart
        const newItem: CartItem = {
          ...payload,
          totalPrice: payload.price * payload.quantity,
        };

        state.items.push(newItem);
        console.log("✨ New item added to cart");
      }

      // Calculate total
      state.total = state.items.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0
      );

      state.itemCount = state.items.length;

      console.log("💰 Cart Total:", state.total);
      console.log("📊 Total Items:", state.itemCount);
      console.log("==========================================\n");
    },

    // ==========================================
    // REMOVE FROM CART REDUCER
    // ==========================================
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; size: string }>
    ) => {
      const { productId, size } = action.payload;

      console.log("==========================================");
      console.log("🗑️ REMOVE FROM CART REDUCER");
      console.log("==========================================");
      console.log(`Removing: productId=${productId}, size=${size}`);

      // Check if item exists
      const itemExists = state.items.some(
        (item) => item.productId === productId && item.size === size
      );

      if (!itemExists) {
        console.warn(`❌ Item not found: productId=${productId}, size=${size}`);
        return;
      }

      const removedItem = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      // Remove item from cart
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      );

      console.log(`✅ Item removed: ${removedItem?.productName}`);
      console.log(`📦 Remaining items in cart: ${state.items.length}`);

      // Recalculate total and item count
      state.total = state.items.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0
      );
      state.itemCount = state.items.length;

      console.log("💰 Updated Cart Total:", state.total);
      console.log("==========================================\n");
    },

    // ==========================================
    // UPDATE QUANTITY REDUCER
    // ==========================================
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        size: string;
        quantity: number;
      }>
    ) => {
      const { productId, size, quantity } = action.payload;

      console.log("==========================================");
      console.log("📝 UPDATE QUANTITY REDUCER");
      console.log("==========================================");
      console.log(
        `Updating: productId=${productId}, size=${size}, new quantity=${quantity}`
      );

      // Validation
      if (quantity < 1) {
        console.warn("❌ Quantity must be at least 1");
        return;
      }

      // Find item
      const item = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (!item) {
        console.warn(`❌ Item not found: productId=${productId}, size=${size}`);
        return;
      }

      const oldQuantity = item.quantity;
      item.quantity = quantity;
      item.totalPrice = item.price * item.quantity;

      console.log(
        `✅ Quantity updated: ${oldQuantity} → ${item.quantity} for ${item.productName}`
      );

      // Recalculate total
      state.total = state.items.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0
      );

      console.log("💰 Updated Cart Total:", state.total);
      console.log("==========================================\n");
    },

    // ==========================================
    // INCREASE QUANTITY REDUCER
    // ==========================================
    increaseQuantity: (
      state,
      action: PayloadAction<{ productId: string; size: string }>
    ) => {
      const { productId, size } = action.payload;

      console.log("==========================================");
      console.log("⬆️ INCREASE QUANTITY REDUCER");
      console.log("==========================================");

      const item = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (!item) {
        console.warn(`❌ Item not found: productId=${productId}, size=${size}`);
        return;
      }

      // Check stock availability
      if (item.quantity >= item.availableStock) {
        console.warn(
          `⚠️ Cannot increase quantity. Maximum stock reached: ${item.availableStock}`
        );
        return;
      }

      item.quantity += 1;
      item.totalPrice = item.price * item.quantity;

      console.log(
        `✅ Quantity increased to ${item.quantity} for ${item.productName}`
      );

      // Recalculate total
      state.total = state.items.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0
      );

      console.log("💰 Updated Cart Total:", state.total);
      console.log("==========================================\n");
    },

    // ==========================================
    // DECREASE QUANTITY REDUCER
    // ==========================================
    decreaseQuantity: (
      state,
      action: PayloadAction<{ productId: string; size: string }>
    ) => {
      const { productId, size } = action.payload;

      console.log("==========================================");
      console.log("⬇️ DECREASE QUANTITY REDUCER");
      console.log("==========================================");

      const item = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (!item) {
        console.warn(`❌ Item not found: productId=${productId}, size=${size}`);
        return;
      }

      if (item.quantity <= 1) {
        console.warn(
          "⚠️ Quantity cannot be less than 1. Use removeFromCart instead"
        );
        return;
      }

      item.quantity -= 1;
      item.totalPrice = item.price * item.quantity;

      console.log(
        `✅ Quantity decreased to ${item.quantity} for ${item.productName}`
      );

      // Recalculate total
      state.total = state.items.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0
      );

      console.log("💰 Updated Cart Total:", state.total);
      console.log("==========================================\n");
    },

    // ==========================================
    // CLEAR CART REDUCER
    // ==========================================
    clearCart: (state) => {
      console.log("==========================================");
      console.log("🧹 CLEAR CART REDUCER");
      console.log("==========================================");
      console.log(`Clearing ${state.items.length} items from cart`);

      state.items = [];
      state.total = 0;
      state.itemCount = 0;

      console.log("✅ Cart cleared successfully");
      console.log("==========================================\n");
    },

    // ==========================================
    // UPDATE ITEM REDUCER (For multiple fields)
    // ==========================================
    updateItem: (
      state,
      action: PayloadAction<{
        productId: string;
        size: string;
        updates: Partial<CartItem>;
      }>
    ) => {
      const { productId, size, updates } = action.payload;

      console.log("==========================================");
      console.log("🔄 UPDATE ITEM REDUCER");
      console.log("==========================================");

      const item = state.items.find(
        (item) => item.productId === productId && item.size === size
      );

      if (!item) {
        console.warn(`❌ Item not found: productId=${productId}, size=${size}`);
        return;
      }

      Object.assign(item, updates);

      // Recalculate totalPrice if quantity or price changed
      if (updates.quantity || updates.price) {
        item.totalPrice = item.price * item.quantity;
        console.log(`✅ Updated item totalPrice: ₹${item.totalPrice}`);
      }

      // Recalculate cart total
      state.total = state.items.reduce(
        (sum, item) => sum + (item.totalPrice || 0),
        0
      );

      console.log("💰 Updated Cart Total:", state.total);
      console.log("==========================================\n");
    },

    // ==========================================
    // RESET CART STATE REDUCER
    // ==========================================
    resetCart: (state) => {
      console.log("==========================================");
      console.log("🔄 RESET CART STATE REDUCER");
      console.log("==========================================");

      state.items = initialState.items;
      state.total = initialState.total;
      state.itemCount = initialState.itemCount;

      console.log("✅ Cart reset to initial state");
      console.log("==========================================\n");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) =>
  state?.app?.cart?.items ?? [];

export const selectCartTotal = (state: RootState) =>
  state?.app?.cart?.items?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) ?? 0;

// -------------------- EXPORT REDUCERS --------------------
export const authReducer = authSlice.reducer;
export const cartReducer = cartSlice.reducer;
