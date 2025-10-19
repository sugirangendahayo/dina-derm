// frontend/src/components/Dashboard.js (New, for admin index route)
import React from "react";

const Dashboard = () => {
  // Fake stats for analytics
  const stats = [
    { title: "Total Products", value: 150, icon: "🛍️"  },
    { title: "Total Orders", value: 320, icon: "📦"},
    { title: "Total Users", value: 1200, icon: "👥" },
    {
      title: "Total Revenue",
      value: "$45,000",
      icon: "💰",
    },
    { title: "New Orders Today", value: 45, icon: "🔔" },
    { title: "Active Users", value: 850, icon: "📈" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`card p-6 backdrop-blur-md m-2 bg-white/10 border border-white/20 shadow-lg rounded-lg py-2 z-40 overflow-y-auto transition-all duration-300 ease-in-out  text-white `}
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
