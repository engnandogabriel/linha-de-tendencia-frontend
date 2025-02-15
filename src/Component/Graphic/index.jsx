import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Dot,
  ReferenceLine,
} from "recharts";
import { classificationColor } from "../../data/desgastes";
import DateFormat from "../DateFormat";
import InfoModal from "../InfoModal";

const DeteriorationChart = ({
  title,
  data,
  domainX,
  domainY,
  referenceLineMin,
  referenceLineMax,
}) => {
  const [clickedPoint, setClickedPoint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dataChart = data.deteriorations.map((deterioration) => ({
    deteriorationId: deterioration.deteriorationId,
    startedIn: deterioration.startedIn,
    finishedIn: deterioration.finishedIn,
    valor: deterioration.value,
    classification: deterioration.classification,
  }));

  const handleChartClick = (e) => {
    const { activePayload } = e;
    if (activePayload && activePayload.length > 0) {
      const clickedData = activePayload[0].payload;
      setClickedPoint(clickedData);
      setShowModal(true);
    }
  };
  const handleCloseModal = () => setShowModal(false);
  return (
    <div>
      <h4>{title}</h4>
      <LineChart
        width={700}
        height={300}
        data={dataChart}
        onClick={handleChartClick} // Adiciona o evento de clique
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[domainX, domainY]} />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const { classification, valor, startedIn, finishedIn } =
                payload[0].payload;
              return (
                <div>
                  <DateFormat message="Início da Manutenção" date={startedIn} />
                  <DateFormat message="Fim da Manutenção" date={finishedIn} />
                  <p>{`Valor do Desgaste: ${valor}`}</p>
                  <p>{`Classificação: ${classification}`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend dx="XXXXXXXX" />
        {referenceLineMax && (
          <ReferenceLine y={referenceLineMax} stroke="black" strokeWidth={1} />
        )}

        {referenceLineMin && (
          <ReferenceLine y={referenceLineMin} stroke="black" strokeWidth={1} />
        )}
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#000"
          dot={({ cx, cy, payload, index }) => {
            const totalPoints = dataChart.length;
            const isLastFour = index >= totalPoints - 4;
            return (
              <g>
                {isLastFour ? (
                  <Dot cx={cx} cy={cy} r={5} fill="#000" strokeWidth={2} />
                ) : (
                  classificationColor.map((e, idx) =>
                    e.classification === payload.classification ? (
                      <Dot
                        key={`dot-${payload.classification}-${idx}`}
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill={e.color}
                      />
                    ) : null
                  )
                )}
              </g>
            );
          }}
          connectNulls
        />
      </LineChart>

      <InfoModal
        title={title}
        showModal={showModal}
        clickedPoint={clickedPoint}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default DeteriorationChart;
