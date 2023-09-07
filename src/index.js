import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApiDataProvider } from '../src/app/ApiDataContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApiDataProvider>
        <App />
    </ApiDataProvider>
);


