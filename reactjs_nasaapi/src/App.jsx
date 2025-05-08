import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"
import LoadingSpinner from "./components/LoadingSpinner"
import { useEffect, useState, useRef } from "react"
import { fetchApodData } from "./api/nasa"

function App() {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  function handleToggleModal() {
    setShowModal(!showModal)
  }
  
  useEffect(() => {
    async function fetchAPIData() {
      setLoading(true)
      try {
        const data = await fetchApodData(import.meta.env.VITE_NASA_API_KEY)
        setData(data)
      }
      catch (error) {
        console.error('There has been a problem with your fetch operation: ', error)
      } 
      finally {
        setLoading(false)
      }
    }
    fetchAPIData()
  }, [])

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && data && <Main data={data} />}
      {showModal && data && <SideBar data={data} handleToggleModal={handleToggleModal} />}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  )
}

export default App
