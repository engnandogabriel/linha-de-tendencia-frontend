import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const GET_TUs = async () => {
  const data = axios.get(`${apiUrl}/tu`);
  return data;
};

export const GET_DETERIORATIONS = async (tu, deterioraion) => {
  const data = axios.get(`${apiUrl}/trendline/${tu}/${deterioraion}`);
  return data;
};

export const GET_INFO_DETERIORATION = async (deterioraion_id) => {
  const data = axios.get(`${apiUrl}/desgaste/${deterioraion_id}/info`);
  return data;
};
