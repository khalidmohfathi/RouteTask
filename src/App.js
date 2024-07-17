import React from 'react'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Table from './Components/Table/Table'
import Graph from './Components/Graph/Graph'
import Layout from './Layout/Layout'
import Home from './Components/Home/Home'

let routes = createHashRouter([{
   path: '/', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'table', element: <Table /> },
      { path: 'graph', element: <Graph /> },
   ]
},
])

export default function App() {
   return (
      <RecoilRoot>
         <RouterProvider router={routes} />
      </RecoilRoot>
   )
}
