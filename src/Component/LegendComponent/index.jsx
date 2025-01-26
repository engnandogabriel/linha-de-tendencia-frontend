const LegendComponent = () => {

    return ( 
        <div style={{backgroundColor:"#FFF", padding:"8px", borderRadius:"4px", margin:"0 auto"}}>
            {/* <h6 style={{textAlign:"left"}}>Legenda: </h6> */}
            {/* <ul style={{textAlign:"left"}}> */}
                <span style={{color:"#20ea00"}}>Monitoramento </span>
                <span> </span>
                <span style={{color:"#2218dd"}}> P2 </span>
                <span style={{color:"#ffff05"}}> P1 </span>
                <span style={{color:"#ff8f05"}}> P1F (Pré Restrição) </span>
                <span style={{color:"#ff0505"}}> P0 (Restrição) </span>
            {/* </ul> */}
        </div>
)};
export default LegendComponent;