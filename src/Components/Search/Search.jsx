import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'

export default function Search({ allTransactions, setTransactions, customers }) {

   const input = useRef('')
   const [search, setSearch] = useState({
      placeholder: 'Choose Search Filter...',
      value: 0,
      type: 'text',
   })

   const settingSearch = (e) => {
      setSearch({
         placeholder: `Search by ${e.target[e.target.value].outerText}`,
         value: e.target.value,
         type: e.target.value == 1 ? 'text' : 'number',
      })
   }

   const showAlert = () => {
      Swal.fire({
         title: "Please Enter a Search Term",
         icon: "error",
         showConfirmButton: false,
         timer: 1500,
      })
   }

   const searchByName = () => {
      const searchItem = input.current.value.toLowerCase();
      const customerMap = new Map();

      customers.forEach(customer => {
         if (customer.name.toLowerCase().includes(searchItem)) {
            customerMap.set(Number(customer.id), customer);
         }
      });

      const result = allTransactions.filter(transaction => customerMap.has(transaction.customer_id));
      return result;
   }

   const searchByAmount = () => {
      return allTransactions.filter(transaction => transaction.amount == input.current.value);
   }

   const handleSearch = () => {
      if (input.current.value) {
         let result = [];
         if (search.type == 'text') {
            result = searchByName();
         } else {
            result = searchByAmount();
         }
         setTransactions(result)
      } else {
         showAlert()
      }
   }

   const handleInput = (e) => {
      if (e.key == "Enter") {
         handleSearch()
      } else if (!e.target.value) {
         setTransactions(allTransactions)
      }
   }

   return (
      <div id='search' className="input-group">
         <input
            ref={input}
            type={search.type}
            className='form-control border-dark'
            placeholder={search.placeholder}
            disabled={search.value == 0}
            onKeyUp={handleInput}
         />
         <select className="form-select border-dark" defaultValue={search.value} onChange={settingSearch}>
            <option value={0} hidden disabled>Filter by...</option>
            <option value={1}>Name</option>
            <option value={2}>Amount</option>
         </select>
         <button className="btn btn-dark" type="button" disabled={search.value == 0} onClick={handleSearch}>
            <i className='fa-solid fa-magnifying-glass fa-fw'></i> <span className='d-md-inline d-none'>Search</span>
         </button>
      </div>
   )
}
