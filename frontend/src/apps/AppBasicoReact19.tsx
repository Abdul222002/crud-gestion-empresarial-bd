import React, { useActionState } from 'react'
import { toast } from 'sonner'


type FormState={
  success: boolean,
  message: string,
}

const simularApi = {
    crear:async({name,surname}:{name:string,surname:string})=>{
        await new Promise((resolve) => setTimeout(resolve, 2000))
        if(name === 'error'){
            throw new Error('Error al crear el usuario')
        }
        if(surname === 'error'){
            throw new Error('Error al crear el usuario')
        }
        console.log('Usuario creado correctamente')
    }
}
const AppBasicoReact19 = () => {
    //Funcion asincrona que haga algo con la data del formulario 
    async function formAction(_prevState: FormState, formData: FormData): Promise<FormState> {
        //Aqui simulamos el fetching o lo que sea ansyncrono
        //FormData es un objeto que guarda todos los elemeentos de mi formulario
        const name = formData.get('name') as string
        const surname = formData.get('surname') as string

        const fullName = `${name} ${surname}`

        await simularApi.crear({name, surname})

        toast.success(`Usuario ${fullName} creado correctamente`)
        return {
            success: true,
            message: `Usuario ${fullName} creado correctamente`,
        }
    }
    //estados:useActionState

    const [state,sumbitAction,isPending]= useActionState(formAction,{
        success: false,
        message: '',
    })

    return (
        <div className='min-h-screen relative overflow-hidden bg-gray-50 flex justify-center items-center p-4 isolate'>
            {/* Background Decorations Removed */}

            <div className='bg-white rounded-xl shadow-lg w-full max-w-sm p-6 border border-gray-100'>
                
                <h2 className='text-2xl font-bold text-gray-800 text-center mb-1'>
                    Crear Cuenta
                </h2>
                <p className='text-gray-500 text-center mb-6 text-sm'>
                    Ingresa tus datos para registrarte
                </p>

                <form action={sumbitAction} className='space-y-4'>
                    
                    <div className='space-y-3'>
                        <div className="group">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre
                            </label>
                            <input 
                                type="text" 
                                name='name' 
                                id='name'
                                placeholder="Ej: Juan"
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                                Apellido
                            </label>
                            <input 
                                type="text" 
                                name='surname' 
                                id='surname' 
                                placeholder="Ej: Pérez"
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    <button 
                        type='submit' 
                        disabled={isPending}
                        className={`w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm shadow-md transition-all
                            ${isPending 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {isPending && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {isPending ? 'Procesando...' : 'Crear Usuario'}
                        </div>
                    </button>

                    {/* Mensaje de estado con animación */}
                    <div className={`transition-all duration-500 ease-out overflow-hidden ${state.message ? 'max-h-24 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                        {state.success ? (
                            <div className="bg-emerald-50 text-emerald-800 px-4 py-4 rounded-xl border border-emerald-200 flex items-start gap-3 shadow-sm">
                                <div className="bg-emerald-100 rounded-full p-1 mt-0.5 shrink-0">
                                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">¡Éxito!</h4>
                                    <p className="text-sm mt-0.5 opacity-90">{state.message}</p>
                                </div>
                            </div>
                        ) : state.message ? (
                            <div className="bg-red-50 text-red-800 px-4 py-4 rounded-xl border border-red-200 flex items-start gap-3 shadow-sm">
                                <div className="bg-red-100 rounded-full p-1 mt-0.5 shrink-0">
                                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Error</h4>
                                    <p className="text-sm mt-0.5 opacity-90">{state.message}</p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </form>
            </div>
        </div>
  )
}
//Aqui podria crear un componente aparte para el formulario y pasarle el submitAction y el state como props, pero lo dejo aqui para que se vea todo junto

export default AppBasicoReact19

//Crear un componente llamado componaiesForm que permita añadir contactos a la base de datos para ello debemos gestionar
//el nombre de la compañia el sitio web de la compañia y el ambito de la compañia con el boton de enviar a la tabla companies