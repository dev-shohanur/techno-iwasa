import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Avatar from "@radix-ui/react-avatar";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [author, setAuthor] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log(false);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    if (product?.category) {
      axios
        .get(`http://localhost:5000/category/${product?.category}`)
        .then((response) => {
          setCategory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [product?.category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (product?.author) {
          const response = await axios.get(
            `http://localhost:5000/user/${product?.author}`
          );
          setAuthor(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log(false);
      }
    };

    fetchData();
  }, [product?.author]);

  return (
    <div className="container mx-auto mt-20 ">
      <div className="flex justify-start my-6">
        <Link to={`/product`}>
          <button className="flex justify-between items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
        </Link>
      </div>
      <div>
        {product?.images?.length > 0 ? (
          <img
            className="w-full h-1/2"
            src={product?.images[0]}
            alt={product?.name}
          />
        ) : null}
      </div>
      <div>
        <div className="flex items-center justify-start my-4 gap-10">
          <Avatar.Root className="flex items-center space-x-3">
            <Avatar.Image
              src={author?.pp_url}
              className="w-16 h-16 rounded-full object-cover"
            />
            <Avatar.Fallback
              delayMs={600}
              className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center"
            >
              CT
            </Avatar.Fallback>
            <div>
              <span className="text-gray-700 text-sm font-medium">
                {author?.name}
              </span>
              <span className="block text-gray-700 text-xs text-left">
                {author?.role}
              </span>
            </div>
          </Avatar.Root>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <h2 className="text-4xl text-left mt-4 capitalize">
          Name: <strong>{product?.name}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4">
          Model: <strong>{product?.model}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4">
          Serial: <strong>{product?.serial}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4">
          Manufacture: <strong>{product?.manufacture}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4">
          Commands: <strong>{product?.commands}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4">
          Arival Date: <strong>{product?.arivalDate}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4 capitalize">
          Category: <strong>{category?.name}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4 capitalize">
          Sub Category: <strong>{product?.subCategory}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4 capitalize">
          Stock: <strong>{product?.stock}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4 capitalize">
          Ware House: <strong>{product?.wareHouse}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4 capitalize">
          CreatedAt: <strong>{product?.createdAt?.split("T")[0]}</strong>
        </h2>
        <h2 className="text-4xl text-left mt-4 capitalize">
          Last Updated At: <strong>{product?.lastUpdate?.split("T")[0]}</strong>
        </h2>
      </div>
    </div>
  );
};

export default ProductDetails;
