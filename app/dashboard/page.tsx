import Link from "next/link";
import React from "react";
export const Dashboard = (props) => {
  return (
    <div>
      <p>Dashboard</p>
      <Link style={{ backgroundColor: "#e9faa8", display: "flex" }} href={"/"}>
        Dashboard
      </Link>
    </div>
  );
};

//need to export default for navigation
//need to be labeled as page.tsx
export default Dashboard;
