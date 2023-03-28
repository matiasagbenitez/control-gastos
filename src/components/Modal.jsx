import { useState, useEffect } from "react";
import { Mensaje } from "./Mensaje";
import { generarId } from "../helpers";
import IconoCerrar from "../img/cerrar.svg";

export const Modal = ({
  setModal,
  setAnimarModal,
  animarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
    }
  }, [gastoEditar]);

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("") || cantidad <= 0) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }

    if (Object.keys(gastoEditar).length > 0) {
      const gastoActualizado = {
        id,
        fecha: Date.now(),
        nombre,
        cantidad,
        categoria,
      };
      guardarGasto(gastoActualizado);
      return;

    } else {
      const gasto = {
        id: generarId(),
        fecha: Date.now(),
        nombre,
        cantidad,
        categoria,
      };
      guardarGasto(gasto);
    }

    setGastoEditar({});
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 400);
    setNombre("");
    setCantidad("");
    setCategoria("");
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={IconoCerrar} alt="Cerrar modal" onClick={ocultarModal} />
      </div>

      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>
          {Object.keys(gastoEditar).length > 0 ? "Editar gasto" : "Nuevo gasto"}
        </legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej. Compras en la panadería"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Ej. 500"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="gastos">Gastos varios</option>
          </select>
        </div>

        <input
          type="submit"
          value={
            Object.keys(gastoEditar).length > 0
              ? "Guardar cambios"
              : "Agregar gasto"
          }
        />
      </form>
    </div>
  );
};
