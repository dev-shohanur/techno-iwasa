import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const UpdateAllProduct = ({ items, isOpen, setIsOpen }) => {
  const [categorys, setcategorys] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isSell, setIsSell] = useState(items?.isSell);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((response) => {
        setcategorys(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCategory = (event) => {
    event.preventDefault();

    setSelectedCategory(
      categorys.filter((item) => item._id === event.target.value)
    );
  };

  const handleCreateProduct = async (event) => {
    try {
      event.preventDefault();

      const {
        name,
        model,
        serial,
        manufacture,
        commands,
        arivalDate,
        category,
        subCategory,
        stock,
        wareHouse,
        sellOrNot,
      } = event.target;

      const product = {
        name: name.value,
        model: model.value,
        serial: serial.value,
        manufacture: manufacture.value,
        commands: commands.value,
        arivalDate: arivalDate.value,
        category: category.value,
        subCategory: subCategory.value,
        stock: stock.value,
        wareHouse: wareHouse.value,
        isSell: isSell,
        images: [
          "http://www.techno-iwasa.co.jp/img/TEC_027060_1.JPG",
          "http://www.techno-iwasa.co.jp/img/TEC_027060_1.JPG",
          "http://www.techno-iwasa.co.jp/img/TEC_027060_1.JPG",
        ],
        author: items?.author,
        show: items?.show,

        createdAt: items?.createdAt,
        lastUpdate: new Date(),
      };

      const response = await axios.put(
        `http://localhost:5000/product/${items?._id}`,
        product
      );
      console.log("Response:", response.data);
      setIsOpen(false );
      // Handle success, e.g., show a success message, redirect, etc.
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <section
      className={` w-[100vw] h-[100vh] z-[999999] flex justify-center items-center fixed top-0 left-0 backdrop-blur-sm ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white shadow rounded border-[5px] border-black w-[100%] container p-4">
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-red-800 text-white text-6xl -rotate-[48deg] p-0 rounded-full"
          >
            <span> +</span>
          </button>
        </div>
        <h1 className="text-xl font-bold text-center text-black capitalize dark:text-black">
          Update Product
        </h1>
        <form
          onSubmit={handleCreateProduct}
          className=" h-[80vh] overflow-auto"
        >
          <div className=" gap-6 mt-4  w-[100%]">
            <div className="grid ">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                defaultValue={items.name}
                placeholder="Product Name"
                type="text"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="model"
              >
                Model
              </label>
              <input
                id="model"
                name="model"
                defaultValue={items.model}
                placeholder="Product Model"
                type="text"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="serial"
              >
                Serial No
              </label>
              <input
                id="serial"
                name="serial"
                defaultValue={items.serial}
                type="text"
                placeholder="Serial Number"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="manufacture"
              >
                Manufacture
              </label>
              <input
                id="manufacture"
                name="manufacture"
                defaultValue={items.manufacture}
                placeholder="Manufacture"
                type="text"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="commands"
              >
                Commands
              </label>
              <input
                id="commands"
                name="commands"
                defaultValue={items.commands}
                type="text"
                placeholder="command"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="arivalDate"
              >
                Arival Date
              </label>
              <input
                id="arivalDate"
                name="arivalDate"
                defaultValue={items.arivalDate}
                type="date"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                onChange={handleCategory}
                defaultValue={items.category}
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="" disabled selected>
                  Selected Category
                </option>
                {categorys.map((category) => (
                  <option
                    value={category?._id}
                    selected={items.category === category?._id}
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="subCategory"
              >
                Sub Category
              </label>
              <select
                name="subCategory"
                id="subCategory"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                {selectedCategory[0]?.subCategory?.map((item) => (
                  <option
                    value={item?.name}
                    selected={items?.subCategory === item?.name}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="stock"
              >
                stock
              </label>
              <input
                id="stock"
                type="number"
                defaultValue={items.stock}
                name="stock"
                placeholder="Product Stock"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="grid">
              <label
                className="text-black text-left dark:text-gray-200"
                htmlFor="wareHouse"
              >
                Ware House
              </label>
              <input
                id="wareHouse"
                name="wareHouse"
                defaultValue={items.wareHouse}
                type="text"
                placeholder="Ware House"
                className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex justify-start">
              <div>
                <label className="text-black dark:text-gray-200">
                  Sell Or Not
                </label>
                <div className="flex justify-around ">
                  <div className="flex gap-6 my-2">
                    <label
                      className="text-black dark:text-gray-200"
                      htmlFor="no"
                    >
                      Is Sell
                    </label>
                    <input
                      id="no"
                      name="isSell"
                      type="checkbox"
                      checked={isSell}
                      onChange={() => setIsSell(!isSell)}
                      className="block"
                      placeholder="no"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Image
              </label>
              <div className="grid grid-cols-4 gap-2">
                {images?.map((img) => (
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(img)}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-black"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload image</span>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setImages(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1 text-black">or drag and drop</p>
                  </div>
                  <p className="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateAllProduct;
