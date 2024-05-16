import { useNavigate } from "react-router-dom";

export function CategoriasTable({ categorias }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-800 uppercase text-sm font-semibold">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Categoría</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {categorias.map((categoria) => (
            <tr
              key={categoria.id}
              onClick={() => {
                navigate(`/categorias/${categoria.id}`);
              }}
              className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <td className="py-4 px-6 border-b border-gray-200">{categoria.id}</td>
              <td className="py-4 px-6 border-b border-gray-200">{categoria.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
