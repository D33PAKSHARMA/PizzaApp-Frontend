import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../loading/Loading";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/getpizza`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchAPI();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto " style={{ marginTop: "100px" }}>
          <h1 className="font-bold text-xl my-5">Products</h1>
          <div className="grid grid-cols-5 my-10 gap-24">
            {/* Carts  */}
            {data.map((singleData) => (
              <Product key={singleData._id} Data={singleData} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
