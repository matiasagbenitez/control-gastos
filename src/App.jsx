import { useState } from "react";
import { Header } from "./components/Header";
import { ListadoGastos } from "./components/ListadoGastos";
import { Modal } from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);

  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 400);
  };

  const guardarGasto = (gasto) => {
    setGastos([...gastos, gasto]);
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  return (
    <div className={modal && "fijar"}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos gastos={gastos} />
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
        />
      )}
    </div>
  );
}

export default App;
