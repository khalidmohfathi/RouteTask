import axios from "axios";
import { atom } from "recoil";

function getTransactions() {
   return axios.get('http://localhost:5000/transactions')
      .then(({ data }) => {
         return data
      })
      .catch(({ response }) => {
         return response
      })
}

export const transactionState = atom({
   key: 'transactionState',
   default: await getTransactions(),
});