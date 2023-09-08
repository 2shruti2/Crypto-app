
import { createContext, useContext, useState } from 'react';

const ApiDataContext = createContext();

export const useApiData = () => {
    return useContext(ApiDataContext);
};

export const ApiDataProvider = ({ children }) => {
    const [apiData, setApiData] = useState(null);
    const [coinsData, setCoinsData] = useState(null);

    return (
        <ApiDataContext.Provider value={{ apiData, setApiData, coinsData, setCoinsData }}>
            {children}
        </ApiDataContext.Provider>
    );
};
