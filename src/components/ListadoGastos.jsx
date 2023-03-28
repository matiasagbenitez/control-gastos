import React from "react";
import Gasto from "./Gasto";

export const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length > 0 && "Listado de gastos"}</h2>

      {filtro ? (
        <>
          {gastosFiltrados.length > 0 ? (
            gastosFiltrados.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))
          ) : (
            <h2>No hay gastos en esta categoría</h2>
          )}
        </>
      ) : (
        <>
          {gastos.length > 0 ? (
            gastos.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))
          ) : (
            <h2>No hay gastos aún</h2>
          )}
        </>
      )}
    </div>
  );
};
