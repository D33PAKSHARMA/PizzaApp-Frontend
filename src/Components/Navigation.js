import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/authSlice";
import { toast } from "react-toastify";

function Navigation() {
  const product = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(product);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(logoutUser(null));
    toast.error("User Logout Successfully", {
      autoClose: 2000,
    });
    navigate("/login");
  };

  const cartstyle = {
    // background: "yellow",
    display: "flex",
    borderRadius: "50px",
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between rounded-full px-0.5 fixed top-0  w-full shadow-md z-100 bg-gray-100">
        <Link to="/">
          <img className="mt-2 h-12" src="/Images/logo.png" alt="logo" />
        </Link>

        <ul className="flex">
          <li className="font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="ml-3 font-bold">
            <Link to="/getpizza">Products</Link>
          </li>
          {auth._id ? (
            <li className="ml-3 font-bold">
              <Link
                className="bg-red-500 px-2 py-1 rounded-full"
                to="/login"
                onClick={handleDelete}
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className="ml-3 font-bold bg-yellow-500 px-2  rounded-full">
                <Link to="/login">Login</Link>
              </li>
              <li className="ml-3 font-bold bg-yellow-500 px-2  rounded-full">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          <li className="ml-3 font-bold"></li>

          <li className="ml-3 font-bold">
            <Link to="/Cart">
              <div style={cartstyle} className="bg-yellow-500 px-2">
                <span className="font-bold">{product.cartItems.length}</span>
                <img className="ml-1 " src="/Images/cart.png" alt="cart" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
