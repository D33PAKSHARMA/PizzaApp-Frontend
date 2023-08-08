import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Loading from "../loading/Loading";
const BASE_URL = process.env.REACT_APP_BASE_URL;

function SingleProduct() {
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsadded] = useState(false);

  const [product, setProduct] = useState({});
  const params = useParams(); //take id from url
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/getpizza/${params._id}`);
        setProduct(res.data);
        // console.log(res.data.image.url);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchAPI();
  }, [params._id]);
  // console.log(product);

  const handleAdd = (e) => {
    e.preventDefault();

    setIsadded(true);
    setTimeout(() => {
      setIsadded(false);
    }, 1000);

    dispatch(addToCart(product));
  };

  let history = useNavigate(); // implement back functionality
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto mb-12 ml-20">
          <Link to="">
            <button
              className="mt-20 font-bold mb-12 flex items-center justify-center"
              onClick={() => {
                history(-1);
              }}
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
              <span>Back</span>
            </button>
          </Link>
          <div className="flex">
            <div className="left">
              <img src={product?.image?.url} alt="singleImg" />
            </div>
            <div className="right ml-8  ">
              <h1 className="text-xl font-bold pb-3">{product?.name}</h1>
              <span className="bg-gray-200 rounded-full px-2 py-0.5 ">
                {product?.size}
              </span>
              <div className="font-bold mt-3">₹{`${product?.price}`}</div>
              <button
                onClick={(e) => handleAdd(e, product)}
                className={`${
                  isAdded
                    ? "bg-green-500 rounded-full font-bold"
                    : "bg-yellow-500 rounded-full"
                } :   font-bold py-1 px-5 mt-5`}
              >
                {isAdded ? "Item Added" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
