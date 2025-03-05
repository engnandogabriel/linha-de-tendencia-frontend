import { useState } from "react";
import Chart from "react-apexcharts";
import classificationColorMap from "../../util/classificationColorMap";
import formatDate from "../../util/formatDate";
import InfoModal from "../InfoModal";

const DeteriorationChart = ({
  title,
  data,
  domainX,
  domainY,
  referenceLineMin,
  referenceLineMax,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedPoint, setClickedPoint] = useState(null);

  const handleChartClick = (e, chartContext, opts) => {
    const { seriesIndex, dataPointIndex } = opts;
    if (
      chartContext.w.config.series[seriesIndex] &&
      chartContext.w.config.series[seriesIndex].data[dataPointIndex]
    ) {
      const clickedData =
        chartContext.w.config.series[seriesIndex].data[dataPointIndex];
      setClickedPoint({ ...clickedData, startedIn: clickedData.x });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const dataChart = data.deteriorations.map((deterioration) => ({
    deteriorationId: deterioration.deteriorationId,
    x: deterioration.startedIn,
    y: deterioration.value,
    finishedIn: deterioration.finishedIn,
    classification: deterioration.classification,
    color: classificationColorMap[deterioration.classification],
  }));
  const chartOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: true,
        type: "xy",
      },
      events: {
        click: handleChartClick,
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      min: domainX,
      max: domainY,
      labels: {
        formatter: (value) => value.toFixed(2),
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      enabled: true,
      shared: false,
      custom: function ({ series, dataPointIndex, w }) {
        const point = w.config.series[0].data[dataPointIndex];
        return `
          <div class="custom-tooltip">
            <p><strong>Início da Manutenção:</strong> ${new Date(
              point.x
            ).toLocaleString("pt-BR")}</p>
            <p ><strong>Fim da Manutenção:</strong> ${formatDate(
              point.finishedIn
            )}</p>
            <p ><strong>Valor do Desgaste:</strong> ${point.y.toFixed(2)}</p>
            <p ><strong>Classificação:</strong> ${point.classification}</p>
          </div>
        `;
      },
    },
    annotations: {
      yaxis: [
        referenceLineMin && {
          y: referenceLineMin,
          borderColor: "red",
          // label: {
          //   text: "Mínimo",
          //   style: { color: "#fff", background: "red" },
          // },
        },
        referenceLineMax && {
          y: referenceLineMax,
          borderColor: "red",
          // label: {
          //   text: "Máximo",
          //   style: { color: "#fff", background: "red" },
          // },
        },
      ].filter(Boolean),
      xaxis: [
        {
          x: new Date(dataChart[dataChart.length - 4].finishedIn).getTime(),
          x2: new Date(dataChart[dataChart.length - 1].finishedIn).getTime(),
          // fillColor: "#B3E5FC",
          fillColor: "red",
          opacity: 0.2,
          label: {
            text: "Região de tendência",
            style: { color: "#000", background: "#B3E5FC" },
          },
        },
      ],
    },
    markers: {
      size: 4,
      discrete: dataChart.map((point, index) => ({
        seriesIndex: 0,
        dataPointIndex: index,
        fillColor: point.color,
        strokeColor: "#fff",
        size: 4,
        shape: "circle",
      })),
    },
  };

  const series = [
    {
      name: title,
      data: dataChart,
    },
  ];

  return (
    <div>
      <h4>{title}</h4>
      <InfoModal
        title={title}
        showModal={showModal}
        clickedPoint={clickedPoint}
        handleClose={handleCloseModal}
      />
      <Chart
        options={chartOptions}
        series={series}
        type="line"
        height={300}
        width={700}
      />
    </div>
  );
};

export default DeteriorationChart;
