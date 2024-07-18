import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function useData() {

   const [allTransactions, setAllTransactions] = useState([])
   const [transactions, setTransactions] = useState([])
   const [customers, setCustomers] = useState([])
   const [loading, setLoading] = useState(true)

   function getData() {
      const transactionURL = 'https://route-task-database.onrender.com/transactions'
      const customerURL = 'https://route-task-database.onrender.com/customers'

      axios.all([axios.get(transactionURL), axios.get(customerURL)])
         .then(axios.spread((transactionResponse, customerResponse) => {
            setAllTransactions(transactionResponse.data)
            setTransactions(transactionResponse.data)
            setCustomers(customerResponse.data)
            setLoading(false)
         }))
         .catch(({ response }) => {
            console.log(response);
         })
   }

   useEffect(() => {
      getData()
   }, [])

   return { allTransactions, transactions, setTransactions, customers, setCustomers, loading }
}
