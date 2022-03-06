import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Spinner from "../components/Spinner"

const SeeClient = () => {
  const [client, setClient] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  const { name, company, phone, email, notes } = client

  useEffect(async () => {
    const getClients = async () => {
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

    getClients()
  }, [])

  return loading ? (
    <Spinner />
  ) : Object.keys(client).length === 0 ? (
    <p>No hay resultados para el cliente con id: {id} </p>
  ) : (
    <div>
      <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {name}</h1>
      <p className='mt-3'>Información del cliente</p>

      <p className='text-4xl text-gray-600 mt-10'>
        <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
        {name}
      </p>

      <p className='text-2xl mt-4 text-gray-600'>
        <span className='text-gray-800 uppercase font-bold'>Email: </span>
        {email}
      </p>

      {phone && (
        <p className='text-2xl mt-4 text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Teléfono: </span>
          {phone}
        </p>
      )}

      <p className='text-2xl mt-4 text-gray-600'>
        <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
        {company}
      </p>

      {notes && (
        <p className='text-2xl mt-4 text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Notas: </span>
          {notes}
        </p>
      )}
    </div>
  )
}

export default SeeClient
