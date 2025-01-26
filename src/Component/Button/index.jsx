const Button = ({label, onClick}) => {

    return <button style={
        {height:"38px", backgroundColor:"#0d6efd", padding:"4px", color:"#fff", border:"none", borderRadius:"4px"}
    } onClick={onClick}>{label}</button>
}
export default Button;
