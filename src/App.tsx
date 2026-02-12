import { useEffect } from "react"
import axios from "axios"

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5023/api/rooms") // ganti sesuai port backend kamu
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }, [])

  return <div>Home</div>
}

export default App
