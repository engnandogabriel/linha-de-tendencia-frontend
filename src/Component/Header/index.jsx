import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import LogoTrem from "../../assets/Logo.png";
import LogoGal2 from "../../assets/gal-2.png";
import Button from "../Button/index";
import { tus } from "../../data/desgastes";
import Logo from "../Logo/index";

function Header({ tu, setTu, fetchData }) {
  const handleSelectTu = (eventKey, event) => {
    setTu(event.target.textContent);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="p-3"
      style={{ marginBottom: "24px" }}
    >
      <Nav className="w-100 d-flex justify-content-between align-items-center">
        <Logo logo={LogoTrem} />
        <div className="d-flex" style={{ gap: "8px" }}>
          <div>
            <DropdownButton
              id="dropdown-basic-button-1"
              title={
                <>
                  <i className="bi bi-box-arrow-down"></i>{" "}
                  {tu || "Selecione TU"}
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
          </div>
          <Button label="Pesquisar" onClick={fetchData} />
        </div>
        {/* <Span label="EE/AMV - SIS" /> */}
        <Logo logo={LogoGal2} />
      </Nav>
    </Navbar>
  );
}

export default Header;
