import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";

const LayOut = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <Outlet />
    </div>
  );
};

export default LayOut;
