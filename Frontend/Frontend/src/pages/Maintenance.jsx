import Navbar from '../components/Navbar'
import { useState } from 'react'
import Search from '../components/Search'
import NewServiceForm from '../Modal/NewServiceForm'

export default function Maintenance() {
  const [search, setSearch] = useState('')
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [services, setServices] = useState([
    { id: '321', vehicle: 'T4T4', issue: 'Engine Issue', date: '2026-02-20', cost: '10k', status: 'New' },
    { id: '322', vehicle: 'HIL-321', issue: 'Brake Pad Replacement', date: '2026-02-18', cost: '4k', status: 'Completed' },
    { id: '323', vehicle: 'NV2-555', issue: 'Oil Change', date: '2026-02-15', cost: '1k', status: 'Completed' },
    { id: '324', vehicle: 'SPR-456', issue: 'Tire Replacement', date: '2026-02-14', cost: '6k', status: 'In Progress' },
  ])

  const filteredServices = (() => {
    const q = (search || '').toString().trim().toLowerCase()
    if (!q) return services
    return services.filter(s => {
      const hay = `${s.id} ${s.vehicle} ${s.issue} ${s.date} ${s.cost} ${s.status}`.toLowerCase()
      return hay.includes(q)
    })
  })()
  return (
    <>
      <Navbar />
      <div className="py-2 px-4 sm:px-6 lg:px-8 w-full space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setShowServiceModal(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-95 transition shadow"
            >
              Create New Services
            </button>
          </div>
        </div>
        </div>
      <div className="w-full flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Maintenance</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b">
                        <tr>
                          <th className="py-3 px-4 font-semibold text-gray-700">Log ID</th>
                          <th className="py-3 px-4 font-semibold text-gray-700">Vehicle</th>
                          <th className="py-3 px-4 font-semibold text-gray-700">Issue/Service</th>
                          <th className="py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="py-3 px-4 font-semibold text-gray-700">Cost</th>
                          <th className="py-3 px-4 font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServices.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-6 px-4 text-center text-slate-500">No maintenance logs</td>
                          </tr>
                        ) : (
                          filteredServices.map(s => (
                            <tr key={s.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{s.id}</td>
                              <td className="py-3 px-4">{s.vehicle}</td>
                              <td className="py-3 px-4">{s.issue}</td>
                              <td className="py-3 px-4">{s.date}</td>
                              <td className="py-3 px-4">{s.cost}</td>
                              <td className="py-3 px-4"><span className={`px-2 py-1 rounded text-xs ${s.status === 'Completed' ? 'bg-green-100 text-green-800' : s.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{s.status}</span></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
          </div>
        </div>
          {showServiceModal && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={(e) => e.target === e.currentTarget && setShowServiceModal(false)}
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <h2 className="font-bold text-slate-800 text-base">New Service</h2>
                  <button
                    onClick={() => setShowServiceModal(false)}
                    className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>

                    <div className="px-6 py-5">
                      <NewServiceForm
                        onSave={(payload) => {
                          // create new id and default cost/status
                          const newId = String(Math.floor(1000 + Math.random() * 9000))
                          const newService = {
                            id: newId,
                            vehicle: payload.vehicle || 'Unknown',
                            issue: payload.issue || '',
                            date: payload.date || new Date().toISOString().slice(0,10),
                            cost: payload.cost || payload.notes || '-',
                            status: 'New',
                            notes: payload.notes || ''
                          }
                          setServices((p) => [newService, ...p])
                          setShowServiceModal(false)
                        }}
                        onCancel={() => setShowServiceModal(false)}
                      />
                    </div>
              </div>
            </div>
          )}
      </div>
    </>
  )
}