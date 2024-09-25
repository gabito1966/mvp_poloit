
export default function mensaje() {
  return (
    
      
    <div className="flex flex-col w-full max-h-screen">
      <div className="flex w-full mt-20">
        <h1 className="text-4xl font-bold ml-12">Mensajeria</h1>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-5 gap-4 p-5">
        {/* Tarjeta 1 (40% del ancho) */}
        <div className="col-span-2 m-2 p-10 bg-white text-black rounded-lg shadow-lg">
          <div>
            <h2 className="text-md text-center left-18 top-12 h-10 w-65 border-2 border-[#335B9D] rounded">Enviar mensajes a todos los equipos</h2>
          </div>
          <div>
          <p className="border my-5">
            <hr />
          </p>
            <h3 className="font-bold text-xl mb-2">Equipo 1</h3>
            <div  className="grid grid-cols-6 text-sm text-gray-700 gap-5">
              <p className="col-span-2">7 Integrantes</p>
              <p className="text-end col-span-3">Lorem</p>
            </div>
          </div>
          <div>
          <p className="border my-5">
            <hr />
          </p>
            <h3 className="font-bold text-xl mb-2">Equipo 2</h3>
            <div  className="grid grid-cols-6 text-sm text-gray-700 gap-5">
              <p className="col-span-2">7 Integrantes</p>
              <p className="text-end col-span-3">Lorem</p>
            </div>
          </div>
          <div>
          <p className="border my-5">
            <hr />
          </p>
            <h3 className="font-bold text-xl mb-2">Equipo 3</h3>
            <div  className="grid grid-cols-6 text-sm text-gray-700 gap-5">
              <p className="col-span-2">7 Integrantes</p>
              <p className="text-end col-span-3">Lorem</p>
            </div>
          </div>
          <div>
          <p className="border my-5">
            <hr />
          </p>
            <h3 className="font-bold text-xl mb-2">Equipo 4</h3>
            <div  className="grid grid-cols-6 text-sm text-gray-700 gap-5">
              <p className="col-span-2">7 Integrantes</p>
              <p className="text-end col-span-3">Lorem</p>
            </div>
          </div>
          <div>
          <p className="border my-5">
            <hr />
          </p>
            <h3 className="font-bold text-xl mb-2">Equipo 5</h3>
            <div  className="grid grid-cols-6 text-sm text-gray-700 gap-5">
              <p className="col-span-2">7 Integrantes</p>
              <p className="text-end col-span-3">Lorem</p>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 (60% del ancho) */}
        <div className="col-span-3 m-2 p-10 bg-white  text-black rounded-lg shadow-lg">
          <div className="grid grid-cols-3 justify-around">
            <div className="col-span-1">
              <h2 className="text-xl font-semibold flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path></svg>Equipo 3 </h2>
              <p className="text-gray-700">Integrantes:</p>
            </div>
            <div className="col-span-2">
              <h2 className="text-center text-md h-10 w-42 border-2 border-[#335B9D] rounded">Generado con IA</h2>
            </div>
          </div>
          <p className="border my-5"><hr /></p>
        </div>
      </div>
    </div>
  );
}
