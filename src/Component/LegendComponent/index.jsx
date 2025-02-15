const LegendComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "8px",
        borderRadius: "4px",
        margin: "0 auto",
        width: "800px",
      }}
    >
      <h4 style={{ textAlign: "left" }}>Legenda:</h4>
      <span style={{ color: "#20ea00" }}>Monitoramento </span>
      <span>--</span>
      <span style={{ color: "#2218dd" }}> P2 </span>
      <span>--</span>
      <span style={{ color: "#ffff05" }}> P1 </span>
      <span>--</span>
      <span style={{ color: "#ff8f05" }}> P1F (Pré Restrição) </span>
      <span>--</span>
      <span style={{ color: "#ff0505" }}> P0 (Restrição) </span>
      <span>--</span>
      <span style={{ color: "#000000" }}> Ponto de Tendência </span>
      <span>--</span>
      <span style={{ color: "#000000" }}> Linha de Referência </span>
    </div>
  );
};
export default LegendComponent;
