import axios from "axios";
import { atom } from "recoil";

function getCustomers() {
   return axios.get('https://route-task-database.onrender.com/customers')
      .then(({ data }) => {
         return data
      })
      .catch(({ response }) => {
         return response
      })
}

export const customerState = atom({
   key: 'customerState',
   default: await getCustomers(),
});