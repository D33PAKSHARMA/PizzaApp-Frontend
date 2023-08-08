import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Fuction to add items in cart
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        // Check if item is already present or not
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        // if item id is > 1 then increase cart items
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }

      // Add items in localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // Function to remove items from cart
    removeFromCart(state, action) {
      const updatedCart = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartItems = updatedCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // Decrease items from cart
    decreaseItems(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const updatedCart = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartItems = updatedCart;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // Increase items from cart
    increaseItems(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, decreaseItems, increaseItems } =
  cartSlice.actions;
export default cartSlice.reducer;
