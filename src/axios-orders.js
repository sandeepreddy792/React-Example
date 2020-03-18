import axios from 'axios'

const axiosOrders = axios.create({
    baseURL: 'https://react-my-burger-7c764.firebaseio.com/'
})

export default axiosOrders;