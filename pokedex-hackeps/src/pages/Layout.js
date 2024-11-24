import React from "react";
import AppNavbar from "../components/AppNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <AppNavbar />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;