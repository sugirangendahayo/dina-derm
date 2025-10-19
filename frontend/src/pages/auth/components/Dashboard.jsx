// frontend/src/components/Dashboard.js (New, for admin index route)
import React from "react";

const Dashboard = () => {
  // Fake stats for analytics
  const stats = [
    { title: "Total Products", value: 150, icon: "🛍️", color: "bg-blue-500" },
    { title: "Total Orders", value: 320, icon: "📦", color: "bg-green-500" },
    { title: "Total Users", value: 1200, icon: "👥", color: "bg-purple-500" },
    {
      title: "Total Revenue",
      value: "$45,000",
      icon: "💰",
      color: "bg-yellow-500",
    },
    { title: "New Orders Today", value: 45, icon: "🔔", color: "bg-red-500" },
    { title: "Active Users", value: 850, icon: "📈", color: "bg-indigo-500" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`card shadow-lg rounded-lg p-6 text-white ${stat.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Additional sections like charts can be added here if a chart library is installed */}
    </div>
  );
};

export default Dashboard;
