import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import { useState } from 'react'
import NewExpenseForm from '../Modal/NewExpenseForm'

export default function TripandExpScreen() {
  const [search, setSearch] = useState("")
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [expenses, setExpenses] = useState([
    { id: '321', tripId: '321', driver: 'John', distance: '1000 km', fuelExpense: '19k', miscExpense: '3k', status: 'Done' },
    { id: '322', tripId: '322', driver: 'Alice', distance: '850 km', fuelExpense: '16k', miscExpense: '2.5k', status: 'Done' },
    { id: '323', tripId: '323', driver: 'Bob', distance: '1200 km', fuelExpense: '22k', miscExpense: '4k', status: 'Pending' },
    { id: '324', tripId: '324', driver: 'Carol', distance: '600 km', fuelExpense: '12k', miscExpense: '1.5k', status: 'Done' },
  ])

  const filteredExpenses = (() => {
    const q = (search || '').toString().trim().toLowerCase()
    if (!q) return expenses
    return expenses.filter(e => {
      const hay = `${e.tripId} ${e.driver} ${e.distance} ${e.fuelExpense} ${e.miscExpense} ${e.status}`.toLowerCase()
      return hay.includes(q)
    })
  })()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

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
              onClick={() => setShowExpenseModal(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 active:scale-95 transition shadow"
            >
              Add an Expense
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Expense & Fuel Logging</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-700">Trip ID</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Driver</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Distance</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Fuel Expense</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Misc. Expen</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 px-4 text-center text-slate-500">No expenses found</td>
                    </tr>
                  ) : (
                    filteredExpenses.map(exp => (
                      <tr key={exp.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{exp.tripId}</td>
                        <td className="py-3 px-4">{exp.driver}</td>
                        <td className="py-3 px-4">{exp.distance}</td>
                        <td className="py-3 px-4">{exp.fuelExpense}</td>
                        <td className="py-3 px-4">{exp.miscExpense}</td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 rounded text-xs ${exp.status === 'Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{exp.status}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showExpenseModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowExpenseModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800 text-base">New Expense</h2>
              <button
                onClick={() => setShowExpenseModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-5">
              <NewExpenseForm
                onSave={(payload) => {
                  const newId = String(Math.floor(1000 + Math.random() * 9000))
                  const newExp = {
                    id: newId,
                    tripId: payload.tripId,
                    driver: payload.driver,
                    distance: '0 km',
                    fuelExpense: payload.fuelCost ? `${payload.fuelCost}k` : '-',
                    miscExpense: payload.miscExpense || '-',
                    status: 'Pending',
                  }
                  setExpenses((p) => [newExp, ...p])
                  setShowExpenseModal(false)
                }}
                onCancel={() => setShowExpenseModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
