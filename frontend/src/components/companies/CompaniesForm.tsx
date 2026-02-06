import React, { useActionState } from 'react'
import { toast } from 'sonner'


type FormState={
  success: boolean,
  message: string,
}

const simularApi = {
    crear:async({name,industry,website}:{
      name:string,
      industry:string,
      website:string
    })=>{
        await new Promise((resolve) => setTimeout(resolve, 2000))
        if(name === 'error'){
            throw new Error('Error al crear la empresa')
        }
        if(industry === 'error'){
            throw new Error('Error al crear la empresa')
        }
        if(website === 'error'){
            throw new Error('Error al crear la empresa')
        }
        console.log('Empresa creada correctamente')
    }
}
const CompaniesForm = () => {
  //Funcion asincrona que haga algo con la data del formulario
  const formAction =async(_prevState:FormState,formData:FormData):Promise<FormState> =>{
    const name = formData.get('name')?.toString().trim() ?? ''
    const industry = String(formData.get('industry')).trim()
    const website = String(formData.get('website')).trim()
    if(!name || !industry || !website){
      toast.error('Todos los campos son obligatorios 🤏')
      return {
        success: false,
        message: 'Todos los campos son obligatorios',
      }
    }

    //INTERESANTE ******
    //fetch a la api http://localhost:3001/api/companies con POST
    

    return {
      success: true,
      message: 'Empresa creada correctamente',
    }
  }

  //estado
  const [state,sumbitAction,isPending]= useActionState(formAction,{
        success: false,
        message: '',
    })
  return (
    <>
      <div>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-1'>
          Formulario de Empresas
        </h2>
        <form action={sumbitAction} className='space-y-4'>
          <label>Formulario basico Nombre de la empresa, Industria y WebSite </label>
          <div>
            <label htmlFor="">Nombre de la empresa</label>
            <input type="text"
                    className='input' 
                    id='name'
                    name='name'
                    placeholder='Ej: Google'
                    required />
          </div>
          <div>
            <label htmlFor="">Industria de la empresa</label>
            <input type="text" 
                    className='input'
                    id='industry'
                    name='industry'
                    placeholder='Ej: Tecnologias de la informacion'
                    required />
          </div>
          <div>
            <label htmlFor="">WebSite de la empresa</label>
            <input type="text" 
                    className='input'
                    id='website'
                    name='website'
                    placeholder='www.google.com'
                    required />
          </div>
          <div>
            <button type='submit'
            disabled={isPending}
            className='btn btn-primary'
            >Submit</button>
          </div>
          <div>
            <button type='button'
            disabled={isPending}
            className='btn btn-secondary'
            >Edit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CompaniesForm