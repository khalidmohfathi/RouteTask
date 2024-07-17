import axios from "axios";
import { atom } from "recoil";

function getTransactions() {
   return axios.get('https://route-task-database.onrender.com/transactions')
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