import { useContext, useEffect, useState } from "react";
import { DeteriorationGlobalContext } from "../../Context/Context";
import Header from "../../Component/Header";
import DeteriorationChart from "../../Component/Graphic";
import Title from "../../Component/Title/index";

const Desgastes = () => {
  const [tu, setTu] = useState(null);
  const [desgaste, setDesgaste] = useState(null);
  const [data, setData] = useState(null); 
  const contexDeterioration = useContext(DeteriorationGlobalContext);

  useEffect(() => {
    if (tu != null && desgaste != null) {
      fetchData(); 
    }
  }, [tu, desgaste]);

  async function fetchData() {
      await contexDeterioration.getDeteriorations(tu, desgaste); 
      setData(contexDeterioration.list); 
  }

  return (
    <>
      <Header desgaste={desgaste} setDesgaste={setDesgaste} tu={tu} setTu={setTu} fetchData={fetchData} />
      {data == null && 
        <div>
          <Title text="Selecione os dados"/>
        </div>
      }
      {data && (
      <div style={{ marginTop:"32px", display: "flex", flexWrap: "wrap", width: "50%", margin: "0 auto" }}>
        <Title text={`Linha de Tendência - ${tu}`}/>
        <DeteriorationChart data={data} domainX={data.domainX} domainY={data.domainY}/>
    </div>
      )}
    </>
  );
};

export default Desgastes;
