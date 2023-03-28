import React from "react";
import Gasto from "./Gasto";

export const ListadoGastos = ({gastos}) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>
        {gastos.length > 0 ? "Listado de gastos" : "No hay gastos aún"}
      </h2>

        {gastos.map((gasto) => (
            <Gasto key={gasto.id} gasto={gasto} />
        ))}
    </div>
  );
};
