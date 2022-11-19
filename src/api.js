import axios from 'axios';

const base_url = "https://aenqpyqnil.execute-api.us-east-2.amazonaws.com/testing_terraform_api_dev/";

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