import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import UpdateAllProduct from "./UpdateAllProduct";

const Product = ({ items, fetchProductData }) => {
  const [author, setAuthor] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(items.show);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${items?.author}`
        );
        setAuthor(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log(false);
      }
    };

    fetchData();
  }, [items?.author]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/product/${items?._id}`);
    fetchProductData;
  };

  const handleCheckboxChange = async (value) => {
    console.log(value);
    setIsChecked(value);
    await axios.put(
      `http://localhost:5000/product/show/${items?._id}?show=${isChecked}`,
      isChecked
    );
  };

  return (
    <tr>
      <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
        <img src={items.images[0]} className="w-10 h-10 rounded-full" />
        <div>
          <span className="block text-gray-700 text-sm font-medium">
            Name: <Link to={`/product/${items?._id}`}>{items.name}</Link>
          </span>
          <span className="block text-gray-700 text-xs">
            Model : {items.model}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{author?.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{author?.role}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {items.isShow ? "Available" : "Unavailable"}
      </td>
      <td className="text-right px-6 whitespace-nowrap">
        <button
          onClick={() => setIsOpen(true)}
          className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
        >
          Edit
        </button>
        <UpdateAllProduct
          key={items?._id}
          items={items}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Link to={`/product/${items?._id}`}>
          <button className="py-2 px-3 mx-4 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
            View
          </button>
        </Link>
        {user?.role === ""}
        <button
          onClick={() => handleDelete()}
          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Product;
