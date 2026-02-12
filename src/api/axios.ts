import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:5023",
})

export default instance
