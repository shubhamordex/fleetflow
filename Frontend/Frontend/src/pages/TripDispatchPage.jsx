import Navbar from '../components/Navbar'

export default function TripDispatchPage() {
  return (
    <>
      <Navbar />
      <div className="w-full flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Trip Dispatcher</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Trips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Trips</h2>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-gray-800">Trip #001</p>
                  <p className="text-sm text-gray-600">Vehicle: Tesla Model 3</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-semibold text-gray-800">Trip #002</p>
                  <p className="text-sm text-gray-600">Vehicle: Ford Transit</p>
                </div>
              </div>
            </div>

            {/* Dispatch New Trip */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Dispatch New Trip</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Vehicle</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Choose a vehicle...</option>
                    <option>Tesla Model 3</option>
                    <option>Ford Transit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter destination..." />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Dispatch Trip
                </button>
              </form>
            </div>
          </div>

          {/* Recent Trips History */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Trip History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-4 font-semibold text-gray-700">Trip ID</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Vehicle</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Status</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">#001</td>
                    <td className="py-2 px-4">Tesla Model 3</td>
                    <td className="py-2 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Completed</span></td>
                    <td className="py-2 px-4">2025-02-20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}