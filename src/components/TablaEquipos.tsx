
const equipos = [
  {
    nombre_equipo: 'Equipo A',
    cantidad_integrantes: 5,
    fecha_inicio: '2024-01-01',
  },
  {
    nombre_equipo: 'Equipo B',
    cantidad_integrantes: 4,
    fecha_inicio: '2024-02-01',
  },
  
];

const calcularFechaFinal = (fechaInicio: string | number | Date) => {
  const fecha = new Date(fechaInicio);
  fecha.setDate(fecha.getDate() + 60);
  return fecha.toISOString().split('T')[0]; 
};

const EquipoTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre del Equipo</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad de Integrantes</th>
            <th className="border border-gray-300 px-4 py-2">Fecha de Inicio</th>
            <th className="border border-gray-300 px-4 py-2">Fecha Final</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{equipo.nombre_equipo}</td>
              <td className="border border-gray-300 px-4 py-2">{equipo.cantidad_integrantes}</td>
              <td className="border border-gray-300 px-4 py-2">{equipo.fecha_inicio}</td>
              <td className="border border-gray-300 px-4 py-2">{calcularFechaFinal(equipo.fecha_inicio)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipoTable;
