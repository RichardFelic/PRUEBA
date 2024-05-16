import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {CategoriasPage} from "./pages/CategoriasPage";
import {CategoriasFormPage} from "./pages/CategoriasFormPage";
import {Navigation} from "./components/Navegation";
import {Toaster} from 'react-hot-toast'
import { ProductosPage } from "./pages/ProductosPage";
import { ProductosFormPage } from "./pages/ProductosFormPage";

function App() {
    return (
      <BrowserRouter>
      <div className="container mx-auto">
      <Navigation />
      <Routes>
        <Route path="/" />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/categoriasform" element={<CategoriasFormPage />} />
        <Route path="/categorias/:id" element={<CategoriasFormPage />} />

        <Route path="/productos" element={<ProductosPage />} /> {/* Utiliza ProductosPage */}
          <Route path="/productosform" element={<ProductosFormPage />} />
          <Route path="/productos/:id" element={<ProductosFormPage />} />

      </Routes>
      <Toaster/>
      </div>
      </BrowserRouter>
    );
}
/*element={<Navigate to="/categorias" />} */
export default App