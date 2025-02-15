import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import LogoGAL2 from "../../assets/gal-2.png";
import Button from "../Button/index";
import { tus, amvs } from "../../data/desgastes";
import Span from "../Span";
import Logo from "../Logo/index";

function Header({ amv, setAmv, tu, setTu, fetchData }) {
  const handleSelectTu = (eventKey, event) => {
    setTu(event.target.textContent);
  };

  // const handleSelectAMV = (eventKey, event) => {
  //   setAmv(event.target.textContent);
  // };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="p-3"
      style={{ marginBottom: "24px" }}
    >
      <Nav className="w-100 d-flex justify-content-between align-items-center">
        <Logo logo={LogoGAL2} />
        <div className="d-flex" style={{ gap: "8px" }}>
          <DropdownButton
            id="dropdown-basic-button-1"
            title={
              <>
                <i className="bi bi-box-arrow-down"></i> {tu || "Selecione TU"}
              </>
            }
            onSelect={handleSelectTu}
            className="mr-2"
          >
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {tus
                .sort((a, b) => a.localeCompare(b))
                .map((c) => (
                  <Dropdown.Item key={c} eventKey={c}>
                    {c}
                  </Dropdown.Item>
                ))}
            </div>
          </DropdownButton>
          {/* <DropdownButton
            id="dropdown-basic-button-2"
            title={<><i className="bi bi-box-arrow-down"></i> {amv || 'Selecione o AMV'}</>}
            onSelect={handleSelectAMV}
            className="mr-2"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {amvs.map(a => {
                return <Dropdown.Item eventKey={a}>{a}</Dropdown.Item>
              })}
            </div>
          </DropdownButton> */}
          <Button label="Pesquisar" onClick={fetchData} />
        </div>
        <Span label="EE/AMV - SIS" />
      </Nav>
    </Navbar>
  );
}

export default Header;
