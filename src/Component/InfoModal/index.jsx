import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import {
  FaExclamationTriangle,
  FaPlay,
  FaStop,
  FaCalendarCheck,
} from "react-icons/fa"; // Ícones de alerta, início e fim
import { DeteriorationGlobalContext } from "../../Context/Context";
import DateFormat from "../DateFormat";
import LoadingSpinner from "../LoadingSpinner/index";

const InfoModal = ({ title, showModal, clickedPoint, handleClose }) => {
  const contexDeterioration = useContext(DeteriorationGlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal && clickedPoint) {
      fetchData(); // Chama a API quando o modal é aberto
    }
  }, [showModal, clickedPoint]);

  const fetchData = async () => {
    try {
      setLoading(true); // Define o loading como true
      await contexDeterioration.getInfoDeterioration(
        clickedPoint.deteriorationId
      );
      setLoading(false); // Define o loading como false após a resposta da API
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
      setLoading(false); // Caso haja erro, para o loading
    }
  };

  if (loading || contexDeterioration.infoDeterioration == null) {
    return (
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <LoadingSpinner /> Carregando...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoadingSpinner />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else
    return (
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaExclamationTriangle
              style={{ color: "orange", marginRight: "10px" }}
            />{" "}
            Detalhes - {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickedPoint && (
            <div>
              <Alert variant="info">
                <p>
                  <strong>Responsável pelo cadastro:</strong>{" "}
                  {contexDeterioration.infoDeterioration.userName}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${contexDeterioration.infoDeterioration.userEmail}`}
                  >
                    {contexDeterioration.infoDeterioration.userEmail}
                  </a>
                </p>
                <p>
                  <strong>Código de matrícula:</strong>{" "}
                  {contexDeterioration.infoDeterioration.userCode}
                </p>
              </Alert>
              <Alert variant="light">
                <p>
                  <strong>Observações:</strong>{" "}
                  {contexDeterioration.infoDeterioration.observations ||
                    "Sem observações"}
                </p>
                <p>
                  <strong>Comentários:</strong>{" "}
                  {contexDeterioration.infoDeterioration.comments ||
                    "Sem comentários"}
                </p>
              </Alert>
              <Alert variant="light">
                <div>
                  <FaPlay style={{ color: "green", marginRight: "10px" }} />
                  <DateFormat
                    message="Início da Manutenção:"
                    date={clickedPoint.startedIn}
                  />
                </div>

                <div>
                  <FaStop style={{ color: "red", marginRight: "10px" }} />
                  <DateFormat
                    message="Fim da Manutenção:"
                    date={clickedPoint.finishedIn}
                  />
                </div>
                <div>
                  <FaCalendarCheck style={{ marginRight: "10px" }} />
                  <DateFormat
                    message="Inserido em:"
                    date={contexDeterioration.infoDeterioration.createdAt}
                  />
                </div>
                <p>
                  <strong>Valor do Desgaste:</strong> {clickedPoint.valor}
                </p>
                <p>
                  <strong>Classificação:</strong> {clickedPoint.classification}
                </p>
              </Alert>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
};

export default InfoModal;
