import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { AuthContextData } from "../context/AuthContext.jsx";
import {
  FiBox,
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiArrowUp,
  FiPackage,
  FiStar,
  FiMessageSquare,
  FiUserPlus
} from "react-icons/fi";

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const stats = {
    revenue: 12540,
    activeUsers: 256,
    pendingOrders: 8
  };

  const { serverUrl } = useContext(AuthContextData);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const [productsRes, ordersRes] = await Promise.all([
        axios.get(`${serverUrl}/api/product/list`, { withCredentials: true }),
        axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      ]);

      setTotalProducts(productsRes.data.length);
      setTotalOrders(ordersRes.data.length);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const StatCard = ({ title, value, icon: Icon, growth, currency }) => (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-[#e7c3a0]/30">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs uppercase tracking-wider text-[#8a5a3c] mb-2">
            {title}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#5b3a2c]">
            {loading ? "—" : currency ? `₹${value.toLocaleString()}` : value}
          </h2>
          <div className="flex items-center mt-2 text-xs text-green-600">
            <FiArrowUp className="mr-1" />
            {growth}% <span className="ml-2 text-gray-400 hidden sm:inline">from last month</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-[#fff1df]">
          <Icon className="text-xl text-[#8a5a3c]" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Nav />

      <div className="flex">
        {/* SIDEBAR (hidden on mobile) */}
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-10">
          <div className="max-w-[1400px] mx-auto">
            {/* HEADER */}
            <div className="mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#5b3a2c]">
                Dashboard
              </h1>
              <p className="text-sm text-[#8a5a3c]/70 mt-1">
                Welcome back! Store overview for today
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <StatCard title="Total Products" value={totalProducts} icon={FiBox} growth={4.2} />
              <StatCard title="Total Orders" value={totalOrders} icon={FiShoppingBag} growth={8.7} />
              <StatCard title="Revenue" value={stats.revenue} icon={FiDollarSign} growth={12.5} currency />
              <StatCard title="Active Users" value={stats.activeUsers} icon={FiUsers} growth={3.1} />
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* PERFORMANCE OVERVIEW */}
              <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#e7c3a0]/30">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#5b3a2c]">
                    Performance Overview
                  </h3>
                  <FiTrendingUp className="text-[#8a5a3c]" />
                </div>

                <div className="w-full h-48 sm:h-56">
                  <svg viewBox="0 0 600 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e7c3a0" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#e7c3a0" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 140 L80 120 L160 135 L240 90 L320 110 L400 80 L480 95 L560 60 L560 200 L0 200 Z"
                      fill="url(#areaGradient)"
                    />

                    <path
                      d="M0 140 L80 120 L160 135 L240 90 L320 110 L400 80 L480 95 L560 60"
                      fill="none"
                      stroke="#8a5a3c"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {[140,120,135,90,110,80,95,60].map((y, i) => (
                      <circle key={i} cx={i * 80} cy={y} r="4" fill="#8a5a3c" />
                    ))}
                  </svg>
                </div>

                <div className="flex justify-between text-xs text-[#8a5a3c]/70 mt-4 px-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </div>

              {/* QUICK STATS */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#e7c3a0]/30">
                <h3 className="text-lg font-semibold text-[#5b3a2c] mb-6">
                  Quick Stats
                </h3>

                {[
                  { label: "Low Stock Items", value: 5, icon: FiPackage },
                  { label: "High Rated Products", value: 23, icon: FiStar },
                  { label: "Pending Reviews", value: 12, icon: FiMessageSquare },
                  { label: "New Customers", value: 47, icon: FiUserPlus }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b last:border-none">
                    <div className="flex items-center gap-3">
                      <item.icon className="text-[#8a5a3c]" />
                      <span className="text-sm text-[#5b3a2c]">{item.label}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fff1df] text-[#8a5a3c]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-center text-[#8a5a3c]/50 mt-12">
              Data updates every 5 minutes • Last updated just now
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
