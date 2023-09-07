
import React, { createContext, useContext, useState } from 'react';

const ApiDataContext = createContext();

export const useApiData = () => {
    return useContext(ApiDataContext);
};

export const ApiDataProvider = ({ children }) => {
    const [apiData, setApiData] = useState(null);

    return (
        <ApiDataContext.Provider value={{ apiData, setApiData }}>
            {children}
        </ApiDataContext.Provider>
    );
};
