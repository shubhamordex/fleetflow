import Navbar from '../components/Navbar'

export default function Analytics() {
  return (
    <>
      <Navbar />
      <div className="w-full flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">Analytics data coming soon...</p>
          </div>
        </div>
      </div>
    </>
  )
}