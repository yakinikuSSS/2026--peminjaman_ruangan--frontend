import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:5023/api",
})

export default instance
