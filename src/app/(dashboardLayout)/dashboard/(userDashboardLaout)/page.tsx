import { User, Calendar, DollarSign, Star } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back<span className="font-medium"></span>!
        </p>
        <p className="text-bold mt-2 text-2xl">
          Note: I have to make this page dynamic!
          <span className="font-medium"></span>!
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <User className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-lg font-semibold text-gray-800">12</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <Calendar className="h-6 w-6 text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Upcoming Sessions</p>
            <p className="text-lg font-semibold text-gray-800">3</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <DollarSign className="h-6 w-6 text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Earnings</p>
            <p className="text-lg font-semibold text-gray-800">$480</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <Star className="h-6 w-6 text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Average Rating</p>
            <p className="text-lg font-semibold text-gray-800">4.8</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white p-4 rounded-xl shadow">
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between">
              <span>Booked a session with Mentor John</span>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Completed session on React.js</span>
              <span className="text-gray-500 text-sm">1 day ago</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Left a review for Mentor Jane</span>
              <span className="text-gray-500 text-sm">3 days ago</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Page;
