import { useState } from "react";
import IconoCerrar from "../img/cerrar.svg";

export const Modal = ({ setModal, setAnimarModal, animarModal }) => {
  const ocultarModal = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={IconoCerrar} alt="Cerrar modal" onClick={ocultarModal} />
      </div>

      <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>Nuevo gasto</legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej. Compras en la panadería"
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input id="cantidad" type="number" placeholder="Ej. 500" />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select id="categoria">
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

        <input type="submit" value="Añadir gasto" />
      </form>
    </div>
  );
};
