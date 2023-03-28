import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const ControlPresupuesto = ({
  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    setGastado(totalGastado);
    setDisponible(presupuesto - totalGastado);
    setTimeout(() => {
      setPorcentaje(((totalGastado / presupuesto) * 100).toFixed(2));
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    Swal.fire({
      title: "¿Deseas reiniciar la app?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, reiniciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setPresupuesto(0);
        setGastos([]);
        setIsValidPresupuesto(false);
        Swal.fire({
          title: "¡Reiniciado!",
          text: "La app ha sido reiniciada.",
          icon: "success",
          confirmButtonColor: "#3B82F6",
        });
      }
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% gastado`}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#D1D5DB",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear app
        </button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={disponible < 0 ? "negativo" : ""}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};
