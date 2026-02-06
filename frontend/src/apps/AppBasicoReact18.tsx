import React, { useState } from 'react'
import { toast } from 'sonner'

type formState={
  success: boolean,
  message: string,
}

const simularApiReact18 =()=>{
  //Temporizador de 2 segundos que simule que me esto conectando a una api, y que me devuelva un mensaje de exito o error
  return new Promise<formState>((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5
      if (success) {
        resolve({
          success: true,
          message: 'Formulario enviado correctamente',
        })
      } else {
        reject({
          success: false,
          message: 'Error al enviar el formulario',
        })
      }
    }, 2000)
  })
}
const AppBasicoReact18 = () => {
  // hook --usestate
  //Estado que guarde todo
  const [name, setName] = useState<string | null>(null)
  const [surname, setSurname] = useState<string | null>(null)
  const [state, setState] = useState<formState | null>({
    success: false,
    message: '',
  })
  //errores 
  const [error, setError] = useState<string | null>(null)
  //loading
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    //validaciones y trimear los campos y hacer un toast
    if (!name || !surname) {
      setError('Todos los campos son obligatorios')
      return 
    }

    const trimmedName = name.trim()
    const trimmedSurname = surname.trim()
    
    if (trimmedName.length === 0 || trimmedSurname.length === 0) {
      setError('Los campos no pueden estar vacíos')
      return 
    }

    const fullName = `${trimmedName} ${trimmedSurname}`
    if (fullName.length < 5) {
      setError('El nombre completo debe tener al menos 5 caracteres')
      return 
    }
    toast.success('Formulario enviado correctamente')


    //si no pasa las validaciones, setError
    //si pasa las validaciones, setState
  }
  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <label>Formulario basico Nombre y apellidos </label>
          <input type="text" 
                  name="name" 
                  value={name} 
                  onChange={(e)=> setName(e.target.value)} 
                  placeholder='name...' />
          <input type="text" 
                  name="surname" 
                  value={surname} 
                  onChange={(e)=> setSurname(e.target.value)} 
                  placeholder='surname...' />
          <button
            type='submit' 
            >Submit</button>
        </form>
      </div>
    </>
  )
}

export default AppBasicoReact18