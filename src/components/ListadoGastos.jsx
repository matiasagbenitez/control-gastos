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
      {gastos.length > 0 && (
        <>
          <h2>Listado de gastos</h2>
          <p className="texto-deslizar">
            Puedes editar un gasto deslizándolo hacia la derecha, o bien,
            eliminar uno de ellos deslizándolo hacia la izquierda.
          </p>
        </>
      )}
      {filtro ? (
        <>
          {!(gastosFiltrados.length > 0) && (
            <h2>No hay gastos en esta categoría</h2>
          )}
          {gastosFiltrados.length > 0 &&
            gastosFiltrados.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
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
