import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function TripandExpScreen() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
    <Navbar />
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Trip & Expense Management</h1>
    </>
  )
}
