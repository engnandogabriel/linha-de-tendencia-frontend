const tus = [
  "TU182-L0001-AMV1822C",
  "TU236-L0001-AMV2361B",
  "TU244-L0001-AMV2442C",
  "TU182-L0002-AMV1824C",
  "TU209-L0001-AMV2092C",
  "TU253-L0001-AMV2531B",
  "TU236-L0001-AMV2362C",
  "TU170-L0002-AMV1704C",
  "TU216-L0002-AMV2163B",
  "TU236-L0002-AMV2363B",
  "TU244-L0001-AMV2441B",
  "TU201-L0002-AMV2014C",
  "TU193-L0001-AMV1931B",
  "TU209-L0001-AMV2091B",
  "TU224-L0002-AMV2244C",
  "TU193-L0002-AMV1934C",
  "TU209-L0002-AMV2094C",
  "TU216-L0002-AMV2164C",
  "TU216-L0001-AMV2162C",
  "TU253-L0002-AMV2533B",
  "TU216-L0001-AMV2161B",
  "TU224-L0002-AMV2243B",
  "TU170-L0002-AMV1703B",
  "TU201-L0001-AMV2012C",
  "TU201-L0002-AMV2013B",
  "TU209-L0002-AMV2093B",
  "TU170-L0001-AMV1701B",
  "TU244-L0002-AMV2444C",
  "TU182-L0002-AMV1823B",
  "TU201-L0001-AMV2011B",
  "TU182-L0001-AMV1821B",
  "TU224-L0001-AMV2242C",
  "TU244-L0002-AMV2443B",
  "TU170-L0001-AMV1702C",
  "TU236-L0002-AMV2364C",
  "TU253-L0001-AMV2532C",
  "TU253-L0002-AMV2534C",
  "TU193-L0002-AMV1933B",
  "TU224-L0001-AMV2241B",
];
const amvs = ["AMV1", "AMV2", "AMV3", "AMV4"];

const desgastes = [
  "Desgaste no trilho da ponta principal do Jacaré",
  "Bitola Ponta Agulha - dorm n° 20-002",
  "Desgaste Vertical TR Encosto Reto na PA",
  "Desgaste Vertical TR Encosto Curvo na PA",
  "Bitola no dormente n°10 -Lado Esq",
  "Bitola no dormente n°10 -Lado Dir",
  "Desg. Lateral TR enc. Reverso",
  "Desg. Lateral TR enc. Reto",
];

const classificationColor = [
  {
    classification: "Sem Classificação",
    color: "#2218dd",
  },
  {
    classification: "Monitoramento",
    color: "#20ea00",
  },
  {
    classification: "P2 (90d)",
    color: "#2218dd",
  },
  {
    classification: "P1 (60d)",
    color: "#ffff05",
  },
  {
    classification: "P1F (30d)",
    color: "#ff8f05",
  },
  {
    classification: "P0 (15d)",
    color: "#ff0505",
  },
];
export { desgastes, classificationColor, tus, amvs };
