import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProductData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  let posts = productData;
  // Empty dependency array ensures the effect runs once after the initial render

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Our products
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            to="/product/add-new"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Product
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Product</th>
              <th className="py-3 px-6">Create Name</th>
              <th className="py-3 px-6">Position</th>
              <th className="py-3 px-6">Status </th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {posts.map((items, idx) => (
              <Product key={idx} items={items} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
