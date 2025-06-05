import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import LogoTrem from "../../assets/Logo.png";
import LogoGal2 from "../../assets/gal-2.png";
import Button from "../Button/index";
import { name_tus, sedes } from "../../data/desgastes";
import Logo from "../Logo/index";
import { useEffect, useState } from "react";

function Header({ tu, setTu, sede, setSede, fetchData }) {
  const [tus, setTus] = useState(null);
  // const [sede, setSede] = useState(null);

  const handleSelectTu = (eventKey, event) => {
    setTu(event.target.textContent);
  };

  const handlSelectSede = (eventKey, event) => {
    setSede(event.target.textContent);
  };

  useEffect(() => {
    if (sede) {
      setTus(null);
      setTus(name_tus[sede]);
    }
  }, [sede]);

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
                  {sede || "Selecione a sede"}
                </>
              }
              onSelect={handlSelectSede}
              className="mr-2"
            >
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                {sedes
                  .sort((a, b) => a.localeCompare(b))
                  .map((c) => (
                    <Dropdown.Item key={c} eventKey={c}>
                      {c}
                    </Dropdown.Item>
                  ))}
              </div>
            </DropdownButton>
          </div>
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
                {tus &&
                  tus
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
        <Logo logo={LogoGal2} />
      </Nav>
    </Navbar>
  );
}

export default Header;
