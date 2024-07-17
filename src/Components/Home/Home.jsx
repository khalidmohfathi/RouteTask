import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { transactionState } from '../../Atoms/Transactions'
import { customerState } from '../../Atoms/Customers'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Home() {

   const [transactions, setTransactions] = useRecoilState(transactionState)
   const [customers, setCustomers] = useRecoilState(customerState)
   const [chartData, setChartData] = useState(null)

   useEffect(() => {

      if ((Array.isArray(customers) && Array.isArray(transactions))) {
         const dates = Array.from(new Set(transactions.map(transaction => transaction.date))).sort()

         const amounts = dates.map(date => {
            return transactions
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

   }, [])

   if (!(Array.isArray(customers) && Array.isArray(transactions))) {
      return (
         <h1 className='text-center my-5'><i className='fa fa-spin fa-spinner'></i></h1>
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
                                 <h3>{transactions.length}</h3>
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
                                 <h3>{transactions.reduce((acc, value) => acc + value.amount, 0)} EGP</h3>
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
