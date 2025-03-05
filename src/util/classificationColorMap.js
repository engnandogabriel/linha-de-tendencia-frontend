import { classificationColor } from "../data/desgastes";
const classificationColorMap = classificationColor.reduce(
  (acc, { classification, color }) => {
    acc[classification] = color;
    return acc;
  }
);

export default classificationColorMap;
