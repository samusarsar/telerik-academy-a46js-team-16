import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import './index.css';

const theme = extendTheme({
    colors: {
        brand: {
            100: '#DBCCBD',
            200: '#D49A6F',
            300: '#B14C31',
            400: '#444A53',
            500: '#021825',
            600: '#f5f5f5',
        },
    } });

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
);
