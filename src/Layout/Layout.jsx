import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'

export default function Layout() {
   return (
      <>
         <h2 className="text-center mt-4">Customers Transactions</h2>
         <hr className="my-2 mb-4" />
         <Outlet />
         <Sidebar />
      </>
   )
}
