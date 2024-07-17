import React, { useState } from 'react'
import Search from '../Search/Search'
import { useRecoilState } from 'recoil';
import { transactionState } from '../../Atoms/Transactions'
import { customerState } from '../../Atoms/Customers';

export default function Table() {

   const [transactions, setTransactions] = useRecoilState(transactionState)
   const [customers, setCustomers] = useRecoilState(customerState)
   const [allTransactions, setAllTransactions] = useState(transactions)

   return (
      <section className='container'>
         <div className="row justify-content-center g-4">
            <div className="col-md-9">
               <Search allTransactions={allTransactions} customers={customers} setTransactions={setTransactions} />
            </div>
            <div className="col-md-9">
               <div className="table-responsive rounded">
                  <table className="table table-hover table-striped align-middle text-center">
                     <thead className='table-dark'>
                        <tr>
                           <th className='text-nowrap' scope="col"><i className="fa-solid fa-user fa-fw"></i> Customer Name</th>
                           <th scope="col"><i className="fa-solid fa-dollar-sign fa-fw"></i> Amount</th>
                           <th scope="col"><i className="fa-regular fa-calendar-days fa-fw"></i> Date</th>
                        </tr>
                     </thead>
                     <tbody className='table-group-divider'>
                        {
                           transactions.length
                              ?
                              transactions.map((item) => {
                                 return (
                                    <tr key={item.id}>
                                       <td>{customers.find((elem) => elem.id == item.customer_id).name}</td>
                                       <td>$ {item.amount}</td>
                                       <td>{new Date(item.date).toLocaleDateString()}</td>
                                    </tr>
                                 )
                              })
                              :
                              <tr>
                                 <td colSpan={3}>There are no matching rows</td>
                              </tr>
                        }
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>
   )
}
