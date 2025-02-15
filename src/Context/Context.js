import { createContext, useState } from "react";
import {
  GET_TUs,
  GET_DETERIORATIONS,
  GET_INFO_DETERIORATION,
} from "../api/api-service";

export const DeteriorationGlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const DeteriorationContext = ({ children }) => {
  const [load, setLoad] = useState(false);
  const [tu, setTu] = useState(null);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [infoDeterioration, setInfoDeterioration] = useState(null);

  async function getTus() {
    try {
      setLoad(true);
      setError(null);
      setInfoDeterioration(null);
      const { data } = await GET_TUs();
      setTu(data.body);
    } catch (error) {
      setError(error);
      setTu(null);
    } finally {
      setLoad(false);
    }
  }

  async function getDeteriorations(tu, deterioration) {
    try {
      setLoad(true);
      setError(false);
      const { data } = await GET_DETERIORATIONS(tu, deterioration);
      if (data.body != null) setList((prev) => [...prev, data.body]);
    } catch (error) {
      setList(null);
    } finally {
      setLoad(false);
    }
  }
  async function getInfoDeterioration(deterioraionId) {
    try {
      setLoad(true);
      setError(false);
      const { data } = await GET_INFO_DETERIORATION(deterioraionId);
      if (data.body != null) {
        setInfoDeterioration(data.body);
      }
    } catch (error) {
      setInfoDeterioration(null);
      setError(true);
    } finally {
      setLoad(false);
    }
  }

  return (
    <DeteriorationGlobalContext.Provider
      value={{
        getTus,
        getDeteriorations,
        getInfoDeterioration,
        load,
        tu,
        list,
        error,
        infoDeterioration,
        setList,
      }}
    >
      {children}
    </DeteriorationGlobalContext.Provider>
  );
};
