import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import {
  FaExclamationTriangle,
  FaPlay,
  FaStop,
  FaCalendarCheck,
  FaTools,
  FaWrench,
  FaStickyNote,
  FaCommentAlt,
} from "react-icons/fa";
import { DeteriorationGlobalContext } from "../../Context/Context";
import formatDate from "../../util/formatDate";
import LoadingSpinner from "../LoadingSpinner/index";

const InfoModal = ({ title, showModal, clickedPoint, handleClose }) => {
  const contexDeterioration = useContext(DeteriorationGlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal && clickedPoint) {
      fetchData();
    }
  }, [showModal, clickedPoint]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await contexDeterioration.getInfoDeterioration(
        clickedPoint.deteriorationId
      );
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
      setLoading(false);
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
                  <strong>Tipo de manutenção: </strong>
                  {contexDeterioration.infoDeterioration.maintenanceType ===
                  "preventivo" ? (
                    <FaTools />
                  ) : (
                    <FaWrench />
                  )}
                  {` ${contexDeterioration.infoDeterioration.maintenanceType}`}
                </p>

                <p>
                  <FaStickyNote /> <strong>Observações:</strong>{" "}
                  {contexDeterioration.infoDeterioration.observations ||
                    "Sem observações"}
                </p>
                <p>
                  <FaCommentAlt /> <strong>Comentários:</strong>{" "}
                  {contexDeterioration.infoDeterioration.comments ||
                    "Sem comentários"}
                </p>
              </Alert>
              <Alert variant="light">
                <div style={{ display: "flex" }}>
                  <FaPlay style={{ color: "green", marginRight: "10px" }} />
                  <p>Fim da manutenção: {formatDate(clickedPoint.startedIn)}</p>
                </div>

                <div style={{ display: "flex" }}>
                  <FaStop style={{ color: "red", marginRight: "10px" }} />
                  <p>
                    Fim da manutenção: {formatDate(clickedPoint.finishedIn)}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <FaCalendarCheck style={{ marginRight: "10px" }} />
                  <p>
                    Inserido em:{" "}
                    {formatDate(
                      contexDeterioration.infoDeterioration.createdAt
                    )}
                  </p>
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
