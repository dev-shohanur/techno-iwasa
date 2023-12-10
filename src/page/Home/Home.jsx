import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/product/products"
      );
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
    <section className="mt-24 mx-auto ">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          Our All Products
        </h1>
        <p className="mt-3 text-gray-500">
          This is our all updated products. In our All Products is Hear You Can
          See.
        </p>
        <Link to={`/product`}>
          <button className="bg-blue-700 py-2 px-6 rounded text-white my-6">
            View All
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
