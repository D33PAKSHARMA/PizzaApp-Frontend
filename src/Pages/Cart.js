import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseItems,
  increaseItems,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  let total = 0;

  // Destructure cartItems from our state cart
  const { cartItems } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  // Delete item from cart
  const deleteFromCart = (product) => {
    Dispatch(removeFromCart(product));
  };

  // Decrease cart items
  const decrease = (product) => {
    Dispatch(decreaseItems(product));
  };

  // increase cart items
  const increase = (product) => {
    Dispatch(increaseItems(product));
  };

  const grandTotal = (cartItems) => {
    //  total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      let curr = cartItems[i].cartQuantity * cartItems[i].price;
      total += curr;
    }
    return total;
  };

  return cartItems.length ? (
    <div
      className="container mx-auto lg:w-1/2 w-full pb-24"
      style={{ marginTop: "100px" }}
    >
      <h1 className="my-10 font-bold text-xl">Cart Items</h1>
      <ul>
        {cartItems.map((product) => {
          return (
            <div key={product._id}>
              <li className="mb-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img className="h-16" src={product.image.url} alt="" />
                    <span className="font-bold ml-4 w-48">{product.name} </span>
                  </div>
                  <div>
                    <button
                      className="rounded-full bg-yellow-500 px-4 py-2 leading-none"
                      onClick={() => decrease(product)}
                    >
                      -
                    </button>
                    <b className="px-2">{product.cartQuantity}</b>
                    <button
                      className="rounded-full bg-yellow-500 px-4 py-2 leading-none"
                      onClick={() => increase(product)}
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold">
                    ₹{product.price * product.cartQuantity}
                  </span>
                  <button
                    className="bg-red-500 rounded-full px-4 py-2 text-white leading-none"
                    onClick={() => deleteFromCart(product)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
      <hr className="my-4" />
      <div className="text-right">
        <b>Grand Total: ₹ {grandTotal(cartItems)}</b>
      </div>
      <div className="text-right mt-4">
        {auth?._id ? (
          <button className="bg-green-600 rounded-full px-4 py-2 leading-none font-bold">
            Order Now
          </button>
        ) : (
          <button
            className="bg-orange-400 rounded-full px-5 py-2 leading-none font-bold"
            onClick={() => navigate("/login")}
          >
            Login to Order
          </button>
        )}
      </div>
    </div>
  ) : (
    <>
      <button
        className="mt-5 font-bold ml-20 flex items-center justify-center"
        onClick={() => navigate("/")}
        style={{ marginTop: "80px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>

        <span>Order Pizza Now</span>
      </button>
      <img
        className="mx-auto w-1/2 mt-8"
        src="/Images/empty-cart_2.png"
        alt=""
      />
    </>
  );
};

export default Cart;
