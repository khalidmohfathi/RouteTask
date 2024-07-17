import axios from "axios";
import { atom } from "recoil";

function getCustomers() {
   return axios.get('http://localhost:5000/customers')
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