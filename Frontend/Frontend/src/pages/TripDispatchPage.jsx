import Navbar from '../components/Navbar'
import Search from '../components/Search'
import { useState } from 'react'
import NewTripModal from '../Modal/NewTripForm'

export default function TripDispatchPage() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const trips = [
    { id: '#001', vehicle: 'Tesla Model 3', plate: 'ABC-123', type: 'Sedan', model: 'Model 3', status: 'Completed', date: '2025-02-20', driver: 'Alice', origin: 'San Francisco', destination: 'Oakland' },
    { id: '#002', vehicle: 'Ford Transit', plate: 'XYZ-789', type: 'Van', model: 'Transit', status: 'Active', date: '2025-02-21', driver: 'Bob', origin: 'Los Angeles', destination: 'San Diego' },
    { id: '#003', vehicle: 'Mercedes Sprinter', plate: 'SPR-456', type: 'Van', model: 'Sprinter', status: 'Scheduled', date: '2025-02-22', driver: 'Carol', origin: 'Chicago', destination: 'Detroit' },
    { id: '#004', vehicle: 'Toyota Hilux', plate: 'HIL-321', type: 'Truck', model: 'Hilux', status: 'Active', date: '2025-02-20', driver: 'Dave', origin: 'Houston', destination: 'Austin' },
    { id: '#005', vehicle: 'Nissan NV200', plate: 'NV2-555', type: 'Van', model: 'NV200', status: 'Completed', date: '2025-02-18', driver: 'Eve', origin: 'Miami', destination: 'Tampa' },
  ]

  const filteredTrips = (() => {
    const q = (search || '').toString().trim().toLowerCase()
    if (!q) return trips
    return trips.filter(t => {
      const hay = `${t.id} ${t.vehicle} ${t.plate} ${t.type} ${t.model} ${t.status} ${t.date} ${t.driver || ''} ${t.origin || ''} ${t.destination || ''}`.toLowerCase()
      return hay.includes(q)
    })
  })()
  return (
    <>
      <Navbar />
      <div >
          <Search
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by plate, type, model, status..."
            buttonLabel="New Trip"
            onButtonClick={() => setShowModal(true)}
          />
        </div>
      <div className="w-full flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 w-full flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Trip History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="py-2 px-4 font-semibold text-gray-700"></th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Trip Fleet</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Driver</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Origin</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Destination</th>
                    <th className="py-2 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrips.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 px-4 text-center text-slate-500">No trips found</td>
                    </tr>
                  ) : (
                    filteredTrips.map(trip => (
                      <tr key={trip.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{trip.id}</td>
                        <td className="py-2 px-4">{trip.vehicle}</td>
                        <td className="py-2 px-4">{trip.driver}</td>
                        <td className="py-2 px-4">{trip.origin}</td>
                        <td className="py-2 px-4">{trip.destination}</td>
                        <td className="py-2 px-4"><span className={`px-2 py-1 rounded text-xs ${trip.status === 'Completed' ? 'bg-green-100 text-green-800' : trip.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{trip.status}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-base">New Trip Registration</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-5">
              <NewTripModal onSave={() => setShowModal(false)} onCancel={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}