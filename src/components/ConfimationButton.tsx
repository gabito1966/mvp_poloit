import React from 'react'

export default function ConfimationButton(setAceptState:any) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-center text-lg mb-4">Estas seguro de eliminar?</p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => setAceptState(true)}>Aceptar</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => setAceptState(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
