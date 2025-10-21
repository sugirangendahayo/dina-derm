// frontend/src/components/Dashboard.js
import React from "react";

const Dashboard = () => {
  // Enhanced stats with trends and colors
  const stats = [
    {
      title: "Total Products",
      value: "150",
      icon: "🛍️",
      trend: "+12%",
      trendUp: true,
      description: "Active skincare products",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Orders",
      value: "320",
      icon: "📦",
      trend: "+8%",
      trendUp: true,
      description: "Orders this month",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Users",
      value: "1.2K",
      icon: "👥",
      trend: "+15%",
      trendUp: true,
      description: "Registered customers",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Revenue",
      value: "$45.2K",
      icon: "💰",
      trend: "+22%",
      trendUp: true,
      description: "This month revenue",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "New Orders",
      value: "45",
      icon: "🔔",
      trend: "+5",
      trendUp: true,
      description: "Today's new orders",
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Active Users",
      value: "850",
      icon: "📈",
      trend: "+42",
      trendUp: true,
      description: "Currently online",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  // Recent activity data
  const recentActivities = [
    {
      user: "Sarah Johnson",
      action: "placed an order",
      time: "2 min ago",
      type: "order",
    },
    {
      user: "Mike Chen",
      action: "created an account",
      time: "5 min ago",
      type: "user",
    },
    {
      user: "Emma Wilson",
      action: "wrote a product review",
      time: "12 min ago",
      type: "review",
    },
    {
      user: "Admin",
      action: "added new product",
      time: "25 min ago",
      type: "product",
    },
    {
      user: "David Kim",
      action: "completed payment",
      time: "35 min ago",
      type: "payment",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "order":
        return "📦";
      case "user":
        return "👤";
      case "review":
        return "⭐";
      case "product":
        return "🛍️";
      case "payment":
        return "💳";
      default:
        return "📝";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Last updated: <span className="text-white">Just now</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <div
              className={`
              relative bg-gradient-to-br ${stat.color} rounded-2xl p-6 border border-white/10 
              transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl
              backdrop-blur-md
            `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-white/80 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        stat.trendUp ? "text-green-300" : "text-red-300"
                      }`}
                    >
                      {stat.trendUp ? "↗" : "↘"} {stat.trend}
                    </span>
                    <span className="text-white/60 text-sm">
                      {stat.description}
                    </span>
                  </div>
                </div>
                <div className="text-4xl opacity-80 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
              </div>

              {/* Progress bar for visual interest */}
              <div className="mt-4 w-full bg-white/20 rounded-full h-1">
                <div
                  className="bg-white/40 h-1 rounded-full transition-all duration-1000 group-hover:bg-white/60"
                  style={{ width: `${Math.random() * 70 + 30}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <span className="text-gray-400 text-sm">Live updates</span>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    <span className="text-gray-300">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Performance Overview
          </h3>
          <div className="space-y-4">
            {/* Conversion Rate */}
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <div>
                <p className="text-gray-400 text-sm">Conversion Rate</p>
                <p className="text-white font-bold text-2xl">3.2%</p>
              </div>
              <div className="text-green-400 font-semibold">+0.4%</div>
            </div>

            {/* Average Order Value */}
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <div>
                <p className="text-gray-400 text-sm">Avg. Order Value</p>
                <p className="text-white font-bold text-2xl">$142.50</p>
              </div>
              <div className="text-green-400 font-semibold">+$12.30</div>
            </div>

            {/* Customer Satisfaction */}
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <div>
                <p className="text-gray-400 text-sm">Customer Satisfaction</p>
                <p className="text-white font-bold text-2xl">4.8/5</p>
              </div>
              <div className="text-green-400 font-semibold">+0.2</div>
            </div>

            {/* Inventory Status */}
            <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700">
              <div>
                <p className="text-gray-400 text-sm">Low Stock Items</p>
                <p className="text-white font-bold text-2xl">8</p>
              </div>
              <div className="text-yellow-400 font-semibold">Need restock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Quick Actions */}
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-200 group text-white text-left">
            <div className="text-2xl mb-2">🛍️</div>
            <p className="font-semibold">Add Product</p>
            <p className="text-gray-400 text-sm">Create new product</p>
          </button>

          <button className="p-4 bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-200 group text-white text-left">
            <div className="text-2xl mb-2">📊</div>
            <p className="font-semibold">View Reports</p>
            <p className="text-gray-400 text-sm">Analytics & insights</p>
          </button>

          <button className="p-4 bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-200 group text-white text-left">
            <div className="text-2xl mb-2">👥</div>
            <p className="font-semibold">Manage Users</p>
            <p className="text-gray-400 text-sm">User management</p>
          </button>

          <button className="p-4 bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-200 group text-white text-left">
            <div className="text-2xl mb-2">⚙️</div>
            <p className="font-semibold">Settings</p>
            <p className="text-gray-400 text-sm">Store configuration</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
