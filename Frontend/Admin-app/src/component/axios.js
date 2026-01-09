import axios from "axios"

const Adminapi = axios.create({
    baseURL : "http://localhost:5050/airline/admin",
    headers : {
        "Content-Type" : "application/json"
    }
})

export default Adminapi