import { createContext, useState } from "react";
import { GET_TUs, GET_DETERIORATIONS } from "../api/api-service";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const DeteriorationGlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const DeteriorationContext = ({ children }) => {

    const [load, setLoad] = useState(false);
    const [tu, setTu] = useState(null);
    const [list, setList] = useState(null);
    const [error, setError] = useState(null)

    async function getTus() {
        try {
            setLoad(true);
            setError(null)
            const {data} = await GET_TUs();
            setTu(data.body)
        } catch (error) {
            console.error(error);
            setError(error)
            setTu(null);
        } finally {
            setLoad(false);
        }
    };

    async function getDeteriorations(tu, deterioration){
        try {
            setLoad(true);
            setError(false);
            const {data} = await GET_DETERIORATIONS(tu, deterioration);
            setList(data.body)
        } catch (error) {
            setList(null)
        }finally{
            setLoad(false)
        }
    };

    return (
        <DeteriorationGlobalContext.Provider value={{ getTus, getDeteriorations, load, tu, list }}>
            {children}
        </DeteriorationGlobalContext.Provider>
    );
};