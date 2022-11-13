import axios from 'axios';

const base_url = "https://k6ijqv2sr8.execute-api.us-east-2.amazonaws.com/prod/";

export const get_data = (cash, tbills, stonks) => new Promise((resolve, reject) => {
    const data = {
        cash : cash,
        tbills : tbills,
        stocks : stonks
    }
    axios.post(`${base_url}/historical-data`, data)
        .then(res => resolve(res.data))
        .catch(err =>{
            reject(err)
        });
});