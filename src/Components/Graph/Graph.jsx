import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import useData from '../../Hooks/useData';

export default function Graph() {

   const { transactions, customers, loading } = useData()
   const [selectedCustomerId, setSelectedCustomerId] = useState(null);
   const [chartData, setChartData] = useState(null);

   useEffect(() => {
      if (selectedCustomerId !== null && selectedCustomerId !== undefined) {

         const customerTransactions = transactions.filter(transaction => transaction.customer_id === selectedCustomerId);

         const aggregatedData = customerTransactions.reduce((acc, transaction) => {
            acc[transaction.date] = (acc[transaction.date] || 0) + transaction.amount;
            return acc;
         }, {});

         const dates = Object.keys(aggregatedData).sort();
         const amounts = dates.map(date => aggregatedData[date]);

         setChartData({
            labels: dates,
            datasets: [
               {
                  label: 'Customer Transactions Amount Per Day',
                  data: amounts,
                  fill: false,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  tension: 0.1,
               }
            ]
         });

      } else {
         setChartData(null);
      }
   }, [selectedCustomerId]);

   if (loading) {
      return (
         <h1 className='text-center my-5'><i className='fa fa-spin fa-spinner'></i></h1>
      )
   }

   return (
      <section className='container'>
         <div className="row justify-content-center g-4">
            <div className="col-lg-9">
               <div className='d-flex justify-content-start gap-2'>
                  <label htmlFor='graphSelect' className='icon-container bg-dark rounded-5'>
                     <i className='fa-solid fa-user text-white'></i>
                  </label>
                  <div>
                     <select id='graphSelect' onChange={(e) => setSelectedCustomerId(Number(e.target.value))} defaultValue={""} className='form-select border-dark'>
                        <option hidden disabled value="">Choose Customer</option>
                        {customers.map((customer) => {
                           return (
                              <option key={customer.id} value={customer.id}>
                                 {customer.name}
                              </option>
                           )
                        })}
                     </select>
                  </div>
               </div>
            </div>
            <div className="col-lg-9">
               {
                  selectedCustomerId && chartData
                     ? <Bar data={chartData} />
                     : <h3 className='text-center my-5'>Select a customer to see his graph</h3>
               }
            </div>
         </div>
      </section>
   );
}
