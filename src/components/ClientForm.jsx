import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

import Spinner from "./Spinner"
import Alert from "./Alert"

const ClientForm = ({ client, loading }) => {
  const navigate = useNavigate()

  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre és muy corto")
      .max(20, "El nombre és muy largo")
      .required("El nombre del cliente és obligatorio"),
    company: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Introduce un email válido")
      .required("El email és obligatorio"),
    phone: Yup.number()
      .integer("Introduce un número de teléfono válido")
      .positive("Introduce un número de teléfono válido")
      .typeError("Introduce un número de teléfono válido"),
  })

  const handleSubmit = async (values) => {
    try {
      let response

      if (client.id) {
        // Client edit
        const url = `http://localhost:4000/clients/${client.id}`

        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
      } else {
        // New client
        const url = "http://localhost:4000/clients"

        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
      }
      
      await response.json()
      navigate("/clients")
    } catch (error) {
      console.log(error)
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
        {client.name ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          name: client?.name ?? "",
          company: client?.company ?? "",
          email: client?.email ?? "",
          phone: client?.phone ?? "",
          notes: client?.notes ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values)
          resetForm()
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className='mt-10'>
              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='name'>
                  Nombre:
                </label>
                <Field
                  id='name'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  type='text'
                  placeholder='Nombre del cliente'
                  name='name'
                />

                {errors.name && touched.name ? (
                  <Alert>{errors.name}</Alert>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='company'>
                  Empresa:
                </label>
                <Field
                  id='company'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  type='text'
                  placeholder='Empresa del cliente'
                  name='company'
                />

                {errors.company && touched.company ? (
                  <Alert>{errors.company}</Alert>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='email'>
                  Email:
                </label>
                <Field
                  id='email'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  type='email'
                  placeholder='Email del cliente'
                  name='email'
                />

                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='phone'>
                  Teléfono:
                </label>
                <Field
                  id='phone'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  type='tel'
                  placeholder='Teléfono del cliente'
                  name='phone'
                />

                {errors.phone && touched.phone ? (
                  <Alert>{errors.phone}</Alert>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='notes'>
                  Notas:
                </label>
                <Field
                  as='textarea'
                  id='notes'
                  className='mt-2 block w-full p-3 bg-gray-50 h-40'
                  type='text'
                  placeholder='Notas del cliente'
                  name='notes'
                />
              </div>

              <input
                type='submit'
                value={client.name ? "Editar Cliente" : "Agregar Cliente"}
                className='mt-5 w-full bg-blue-800 text-white p-3 uppercase font-bold text-lg cursor-pointer hover:bg-blue-900'
              />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

ClientForm.defaultProps = {
  client: {},
  loading: false,
}

export default ClientForm
