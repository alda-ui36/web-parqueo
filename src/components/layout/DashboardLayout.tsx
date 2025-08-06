import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};
