const Span = ({ label }) => {
  return (
    <span
      style={{
        fontSize: "32px",
        padding: "8px",
        color: "#000",
        lineBreak: "break",
      }}
    >
      {label}
    </span>
  );
};
export default Span;
