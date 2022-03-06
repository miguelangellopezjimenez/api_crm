import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import ClientForm from "../components/ClientForm"

const EditClient = () => {
  const [client, setClient] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const getClient = async () => {
      try {
        const url = `http://localhost:4000/clients/${id}`
        const response = await fetch(url)
        const result = await response.json()
        setClient(result)
      } catch (error) {
        console.log(error)
      }
      setLoading(!loading)
    }
    getClient()
  }, [])

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>
        Utiliza este formulario para editar datos de un cliente
      </p>
      {client.name ? <ClientForm client={client} loading={loading} /> : <p>ID de cliente no válido</p>}
    </>
  )
}

export default EditClient
