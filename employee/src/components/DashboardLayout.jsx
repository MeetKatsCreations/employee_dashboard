import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 "> 
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;