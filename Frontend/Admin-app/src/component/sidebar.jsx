import React from 'react'

const sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen fixed">
  <div className="p-6 font-bold text-blue-600 text-xl">
    Airline Admin
  </div>

  <nav className="space-y-1 px-4">
    <NavItem to="/admin/dashboard" icon={<Dashboard />}>Dashboard</NavItem>
    <NavItem to="/admin/airports" icon={<MdLocationOn />}>Airports</NavItem>
    <NavItem to="/admin/aircraft" icon={<MdFlight />}>Aircraft</NavItem>
    <NavItem to="/admin/flights" icon={<MdSchedule />}>Flights</NavItem>
    <NavItem to="/admin/bookings" icon={<MdReceipt />}>Bookings</NavItem>
    <NavItem to="/admin/users" icon={<MdPeople />}>Users</NavItem>
  </nav>
</aside>
  )
}

export default sidebar
