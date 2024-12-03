import React, { useState } from "react";
import axios from "axios";

function App() {
  const [option, setOption] = useState("nomina"); // "nomina" o "productos"
  const [action, setAction] = useState(""); // "ver", "crear", "modificar", "eliminar"
  const [data, setData] = useState([]); // Datos obtenidos del backend
  const [form, setForm] = useState({}); // Formulario para crear/modificar
  const [selectedId, setSelectedId] = useState(""); // ID seleccionado para modificar

  // Manejar selección de Nomina o Productos
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setData([]);
    setAction("");
    setForm({});
    setSelectedId("");
  };

  // Manejar acción seleccionada
  const handleAction = async (selectedAction) => {
    setAction(selectedAction);
    if (
      selectedAction === "ver" ||
      selectedAction === "eliminar" ||
      selectedAction === "modificar"
    ) {
      try {
        const response = await axios.get(`http://localhost:5000/api/${option}`);
        setData(response.data);
      } catch (err) {
        console.error(err);
        alert("Error al cargar datos");
      }
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar selección de ID en "Modificar"
  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const selectedItem = data.find((item) => item._id === id);
    setForm(selectedItem || {});
  };

  // Manejar creación o modificación
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === "crear") {
        await axios.post(`http://localhost:5000/api/${option}`, form);
        alert("Elemento creado");
      } else if (action === "modificar") {
        await axios.put(
          `http://localhost:5000/api/${option}/${form._id}`,
          form
        );
        alert("Elemento modificado");
      }
      setForm({});
      handleAction("ver"); // Refrescar datos
    } catch (err) {
      console.error(err);
      alert("Error al guardar los datos");
    }
  };

  // Manejar eliminación
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/${option}/${id}`);
      alert("Elemento eliminado");
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interfaz Gráfica </h1> <br></br>
      <h2>Taller Final Bases de Datos</h2><br></br>
      <h2>Presentado por: Fredy Paez</h2><br></br>
      <br></br>

      {/* Selector de Nomina o Productos */}
      <select value={option} onChange={handleOptionChange}>
        <option value="nomina">Nomina</option>
        <option value="productos">Productos</option>
      </select>

      {/* Botones de acción */}
      <div>
        <button onClick={() => handleAction("ver")}>Ver</button>
        <button onClick={() => setAction("crear")}>Crear</button>
        <button onClick={() => handleAction("modificar")}>Modificar</button>
        <button onClick={() => handleAction("eliminar")}>Eliminar</button>
      </div>

      {/* Mostrar datos en forma de tabla */}
      {(action === "ver" || action === "eliminar") && (
        <div>
          <h2>Datos de {option}</h2>
          {data.length > 0 ? (
            <table
              border="1"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <thead>
                <tr>
                  {Object.keys(data[0])
                    .filter((key) => key !== "__v")
                    .map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  {action === "eliminar" && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    {Object.keys(item)
                      .filter((key) => key !== "__v")
                      .map((key) => (
                        <td
                          key={key}
                          style={{
                            textAlign: "center", // Centra horizontalmente el contenido en la celda
                            verticalAlign: "middle", // Centra verticalmente el contenido en la celda
                          }}
                        >
                          {((key === "Imagen" && option === "productos") ||
                            (key === "Foto" && option === "nomina")) &&
                          action === "ver" ? (
                            <img
                              src={item[key]}
                              alt="Imagen"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px", // Opcional: bordes redondeados para la imagen
                              }}
                            />
                          ) : (
                            item[key]
                          )}
                        </td>
                      ))}
                    {action === "eliminar" && (
                      <td>
                        <button onClick={() => handleDelete(item._id)}>
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay datos disponibles</p>
          )}
        </div>
      )}

      {/* Formulario de crear/modificar */}
      {(action === "crear" || action === "modificar") && (
        <form onSubmit={handleSubmit}>
          <h2>
            {action === "crear" ? "Crear" : "Modificar"} {option}
          </h2>

          {/* Selector de ID para modificar */}
          {action === "modificar" && data.length > 0 && (
            <div>
              <label>
                Seleccionar ID:
                <select value={selectedId} onChange={handleSelectChange}>
                  <option value="">Seleccione un elemento</option>
                  {data.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item._id}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {/* Campos del formulario */}
          {option === "nomina" && (
            <>
              <input
                name="ID"
                placeholder="ID"
                value={form.ID || ""} // Muestra el valor actual si se está modificando
                onChange={handleInputChange}
                required // Asegura que sea obligatorio
              />
              <input
                name="Nombre"
                placeholder="Nombre"
                value={form.Nombre || ""}
                onChange={handleInputChange}
              />
              <input
                name="Apellido"
                placeholder="Apellido"
                value={form.Apellido || ""}
                onChange={handleInputChange}
              />
              <input
                name="Foto"
                placeholder="URL de Foto"
                value={form.Foto || ""}
                onChange={handleInputChange}
              />
              <input
                name="Correo"
                placeholder="Correo"
                value={form.Correo || ""}
                onChange={handleInputChange}
              />
              <input
                name="Dirección"
                placeholder="Dirección"
                value={form.Dirección || ""}
                onChange={handleInputChange}
              />
              <input
                name="Cargo"
                placeholder="Cargo"
                value={form.Cargo || ""}
                onChange={handleInputChange}
              />
              <input
                name="Salario"
                placeholder="Salario"
                type="number"
                value={form.Salario || ""}
                onChange={handleInputChange}
              />
            </>
          )}
          {option === "productos" && (
            <>
              <input
                name="ID_Serial"
                placeholder="ID Serial"
                value={form.ID_Serial || ""}
                onChange={handleInputChange}
              />
              <input
                name="Nombre"
                placeholder="Nombre del Producto"
                value={form.Nombre || ""}
                onChange={handleInputChange}
              />
              <input
                name="Categoría"
                placeholder="Categoría"
                value={form.Categoría || ""}
                onChange={handleInputChange}
              />
              <input
                name="Imagen"
                placeholder="URL de Imagen"
                value={form.Imagen || ""}
                onChange={handleInputChange}
              />
              <input
                name="Modelo"
                placeholder="Modelo"
                value={form.Modelo || ""}
                onChange={handleInputChange}
              />
              <input
                name="Serie"
                placeholder="Serie"
                value={form.Serie || ""}
                onChange={handleInputChange}
              />
              <input
                name="Marca"
                placeholder="Marca"
                value={form.Marca || ""}
                onChange={handleInputChange}
              />
              <input
                name="Fabricante"
                placeholder="Fabricante"
                value={form.Fabricante || ""}
                onChange={handleInputChange}
              />
            </>
          )}
          <button type="submit">Guardar</button>
        </form>
      )}
    </div>
  );
}

export default App;
