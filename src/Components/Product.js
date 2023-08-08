import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

function Product(props) {
  const Dispatch = useDispatch();

  const [isAdded, setIsadded] = useState(false);

  const { Data } = props;
  // console.log(Data);

  function handleAdd(event, data) {
    event.preventDefault();

    Dispatch(addToCart(data));

    setIsadded(true);
    setTimeout(() => {
      setIsadded(false);
    }, 1000);
  }

  return (
    <Link to={`/getpizza/${Data._id}`}>
      <div>
        <img src={Data?.image.url} alt="images" />
        <div className="text-center">
          <h2 className="text-lg font-bold py-1">{Data?.name}</h2>
          <span className="bg-gray-200 rounded-full px-2 py-0.5">
            {Data?.size}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span>₹{Data?.price}</span>
          <button
            onClick={(e) => {
              handleAdd(e, Data);
            }}
            className={`${
              isAdded ? "bg-green-500" : "bg-yellow-500"
            } rounded-full font-bold py-0.5 px-2.5 `}
          >
            ADD{`${isAdded ? "ED" : ""}`}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Product;
