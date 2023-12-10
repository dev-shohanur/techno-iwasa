import { useContext, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import { AuthContext } from "./Context/AuthProvider";
import SignIn from "./page/Authentication/SignIn";
import PrivetRoute from "./Routes/PrivetRoute";
import NotFound from "./page/NotFound/NotFound";
import LayOut from "./LayOut/LayOut";
import AddNewProduct from "./page/Products/AddNewProduct";
import ImageUploadComponent from "./page/Products/ImageUploadComponent";
import Products from "./page/Products/Products";
import ProductDetails from "./page/Products/productDetails";
import "@radix-ui/themes/styles.css";

function App() {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="overflow-hidden w-[50vw]">
      {!user && loading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route
              path="/"
              element={
                <PrivetRoute>
                  <Home />
                </PrivetRoute>
              }
            />
            <Route
              path="/product/add-new"
              element={
                <PrivetRoute>
                  <AddNewProduct />
                </PrivetRoute>
              }
            />
            <Route
              path="/product"
              element={
                <PrivetRoute>
                  <Products />
                </PrivetRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PrivetRoute>
                  <ProductDetails />
                </PrivetRoute>
              }
            />
            <Route
              path="/img"
              element={
                <PrivetRoute>
                  <ImageUploadComponent />
                </PrivetRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/auth/signin" element={<SignIn />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
