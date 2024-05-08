import Link from "next/link";
import React from "react";
export const Dashboard = (props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Dashboard</p>
      <Link style={{ backgroundColor: "#e9faa8", display: "flex" }} href={"/"}>
        Go home
      </Link>
    </main>
  );
};

//need to export default for navigation
//need to be labeled as page.tsx
export default Dashboard;
