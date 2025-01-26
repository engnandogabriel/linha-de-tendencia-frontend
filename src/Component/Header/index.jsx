import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { DeteriorationGlobalContext } from '../../Context/Context';
import LogoGAL2 from '../../assets/react.svg'
import Button from '../Button/index'
import {desgastes} from '../../data/desgastes';
import Span from '../Span';
import Logo from '../Logo/index'

function Header({ desgaste, setDesgaste, tu, setTu, fetchData }) {
  const [loading, setLoading] = useState(true);
  const context = useContext(DeteriorationGlobalContext);

  useEffect(() => { 
    const fetchContext = async () => {
      await context.getTus();
      setLoading(false);
    };
    
    fetchContext();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectTu = (eventKey, event) => {
    setTu(event.target.textContent);
  };

  const handleSelectDesgaste = (eventKey) => {
    setDesgaste(eventKey); 
  };

  return (
    <Navbar bg="light" expand="lg" className="p-3" style={{marginBottom:"24px"}}>
      <Nav className="w-100 d-flex justify-content-between align-items-center">
          <Logo logo={LogoGAL2}/>
        <div className="d-flex" style={{gap:"8px"}}>
          <DropdownButton
            id="dropdown-basic-button-1"
            title={<><i className="bi bi-box-arrow-down"></i> {tu || 'Selecione Tu'}</>}
            onSelect={handleSelectTu}
            disabled={loading}
            className="mr-2"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {(
                context.tu &&
                context.tu
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((c) => (
                    <Dropdown.Item key={c.id} eventKey={c.id}>
                      {c.name}
                    </Dropdown.Item>
                  ))
              )}
            </div>
          </DropdownButton>
          <DropdownButton
            id="dropdown-basic-button-2"
            title={<><i className="bi bi-box-arrow-down"></i> {desgaste || 'Selecione Desgaste'}</>}
            onSelect={handleSelectDesgaste}
            className="mr-2"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {desgastes.map(desgaste => {
                return <Dropdown.Item eventKey={desgaste}>{desgaste}</Dropdown.Item>
              })}
            </div>
          </DropdownButton>
              <Button label="Pesquisar" onClick={fetchData}/>
        </div>
        <Span label="EE/AMV - SIS"/>
      </Nav>
    </Navbar>
  );
}

export default Header;
