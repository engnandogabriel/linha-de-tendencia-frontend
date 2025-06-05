import { useContext, useState } from "react";
import { DeteriorationGlobalContext } from "../../Context/Context";
import Header from "../../Component/Header";
import DeteriorationChart from "../../Component/Graphic/Chart";
import Title from "../../Component/Title/index";
import LegendComponent from "../../Component/LegendComponent";
import { desgastes } from "../../data/desgastes";
import Loading from "../../Component/Loading";
import ModalError from "../../Component/ModalError";

const Desgastes = () => {
  const [tu, setTu] = useState(null);
  const [sede, setSede] = useState(null);
  const contexDeterioration = useContext(DeteriorationGlobalContext);
  const [load, setLoad] = useState(false);
  const [showModalErro, setShowModalErro] = useState(false);

  async function fetchData() {
    if (tu) {
      contexDeterioration.setList([]);
      setLoad(true);
      for (const deterioration of desgastes) {
        await contexDeterioration.getDeteriorations(tu, deterioration);
      }
      setLoad(false);
    } else {
      setShowModalErro(true);
      setTimeout(() => {
        setShowModalErro(false);
      }, 2000);
    }
  }
  if (load) return <Loading />;

  return (
    <>
      <Header
        tu={tu}
        setTu={setTu}
        sede={sede}
        setSede={setSede}
        fetchData={fetchData}
      />
      {tu && <Title text={`Linha de Tendência ${tu}`} />}
      {showModalErro && (
        <ModalError
          showModal={showModalErro}
          setShowModal={setShowModalErro}
          message={"SELECIONE UM TU!"}
        />
      )}
      {contexDeterioration.list == null && <h2>Sem dados</h2>}
      {contexDeterioration.list && contexDeterioration.list.length > 0 && (
        <LegendComponent />
      )}
      {contexDeterioration.list && (
        <>
          <div
            style={{
              marginTop: "32px",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
              width: "50%",
            }}
          >
            {contexDeterioration.list &&
              contexDeterioration.list.map((data) => {
                <LegendComponent />;
                return (
                  <DeteriorationChart
                    key={data.deteriorationName}
                    title={data.deteriorationName}
                    data={data}
                    domainX={data.domainX}
                    domainY={data.domainY}
                    referenceLineMin={data.referenceLineMin}
                    referenceLineMax={data.referenceLineMax}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Desgastes;
