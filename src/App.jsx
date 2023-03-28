import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { ListadoGastos } from "./components/ListadoGastos";
import { Modal } from "./components/Modal";
import { Filtros } from "./components/Filtros";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

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

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ?? []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 400);
  };

  const guardarGasto = (gasto) => {
    if (Object.keys(gastoEditar).length > 0) {
      const gastosActualizados = gastos.map((gastoActual) => {
        if (gastoActual.id === gasto.id) {
          return gasto;
        } else {
          return gastoActual;
        }
      });
      setGastos(gastosActualizados);
      setGastoEditar({});
      alert("success", "Gasto editado correctamente.");
    } else {
      setGastos([...gastos, gasto]);
      alert("success", "Gasto agregado correctamente.");
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
    alert("success", "Gasto eliminado correctamente.");
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 400);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter((gasto) => {
        return gasto.categoria === filtro;
      });
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoStorage = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoStorage > 0) {
      setPresupuesto(presupuestoStorage);
      setIsValidPresupuesto(true);
    }
  }, []);

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          setAnimarModal={setAnimarModal}
          animarModal={animarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
