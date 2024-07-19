import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import useData from '../../Hooks/useData';
import Chart from 'chart.js/auto';

export default function Home() {

   const { allTransactions, customers, loading } = useData()
   const [chartData, setChartData] = useState(null)


   function handleChart() {
      const dates = Array.from(new Set(allTransactions.map(transaction => transaction.date))).sort()
      const amounts = dates.map(date => {
         return allTransactions
            .filter(transaction => transaction.date === date)
            .reduce((acc, transaction) => acc + transaction.amount, 0);
      });

      setChartData({
         labels: dates,
         datasets: [
            {
               label: 'Transactions Amount Per Day',
               data: amounts,
               fill: false,
               tension: 0.1,
            }
         ]
      });

   }

   useEffect(() => {
      if (!loading) {
         handleChart()
      }
   }, [loading]);

   if (loading) {
      return (
         <h4 className='text-center my-5'>Wait until (Render) refreshes database <i className='fa fa-spin fa-spinner fa-fw'></i></h4>
      )
   }

   return (
      <section>
         <div className="container">
            <div className="row justify-content-center g-4">
               <div className="col-lg-9">
                  <div className="row g-4">
                     <div className="col-md-4">
                        <div className="card shadow">
                           <div className="card-body d-flex justify-content-between">
                              <div>
                                 <span className="d-block fw-medium mb-2">Transactions</span>
                                 <h3>{allTransactions.length}</h3>
                              </div>
                              <div className="icon-container bg-primary rounded">
                                 <i className="fa-solid fa-right-left text-white" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-4">
                        <div className="card shadow">
                           <div className="card-body d-flex justify-content-between">
                              <div>
                                 <span className="d-block fw-medium mb-2">Revenue</span>
                                 <h3>{allTransactions.reduce((acc, value) => acc + value.amount, 0)} EGP</h3>
                              </div>
                              <div className="icon-container bg-success rounded">
                                 <i className="fa-solid fa-dollar text-white" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-4">
                        <div className="card shadow">
                           <div className="card-body d-flex justify-content-between">
                              <div>
                                 <span className="d-block fw-medium mb-2">Customers</span>
                                 <h3>{customers.length}</h3>
                              </div>
                              <div className="icon-container bg-danger rounded">
                                 <i className="fa-solid fa-users text-white" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-9">
                  {
                     chartData
                        ?
                        <Line data={chartData} />
                        :
                        ""
                  }
               </div>
            </div>
         </div>
      </section>


   )
}
