import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const alert = (icon = "success", title = "Signed in successfully") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: title,
  });
};

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
      title: "¿Deseas reiniciar la aplicación?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E7E34",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, reiniciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setPresupuesto(0);
        setGastos([]);
        setIsValidPresupuesto(false);
        Swal.fire({
          title: "¡Genial!",
          text: "La aplicación se reinició correctamente.",
          icon: "success",
          confirmButtonColor: "#1E7E34",
        });
      }
    });
  };

  const handleInyectPresupuesto = () => {
    Swal.fire({
      title: "Ingresa la cantidad de presupuesto que deseas inyectar",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "Inyectar",
      confirmButtonColor: "#1E7E34",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        if (Number(result.value) <= 0) {
          Swal.fire({
            title: "¡Ups!",
            text: "La cantidad debe ser mayor a 0.",
            icon: "error",
            confirmButtonColor: "#3B82F6",
          });
          return;
        } else {
          setPresupuesto(presupuesto + Number(result.value));
          setDisponible(disponible + Number(result.value));
          alert("success", "Presupuesto inyectado correctamente.");
          setTimeout(() => {
            setPorcentaje(
              ((gastado / (presupuesto + Number(result.value))) * 100).toFixed(
                2
              )
            );
          }, 1000);
        }
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

        <button
          className="inyect-app"
          type="button"
          onClick={handleInyectPresupuesto}
        >
          Inyectar presupuesto
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
