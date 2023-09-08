import React, { useEffect } from 'react';
import axios from 'axios';
import { useApiData } from '../src/app/ApiDataContext';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import './App.css'
import 'antd/dist/antd.css';


import { Navbar, Homepage, Cryptocurrencies, CryptoDetails, News, Footer } from './components';

function App() {

  const { setApiData } = useApiData(); // Access setApiData from the context

  // Fetch the API data here and update it using the context
  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/stats',

      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl'
      },
      headers: {
        'X-RapidAPI-Key': '38b8a14652msh80b3761cfac16a1p1863dejsndc65662e9f61',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setApiData(response.data.data); // Update the API data in the context
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchData();
    fetchCoinsData();
  }, []);




  const { setCoinsData } = useApiData(); // Access setApiData from the context

  // Fetch the API data here and update it using the context
  const fetchCoinsData = async () => {

    const option = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '20' , 
        offset: '0'
      },
      headers: {
        'X-RapidAPI-Key': '38b8a14652msh80b3761cfac16a1p1863dejsndc65662e9f61',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(option);
      console.log("sring " , response.data.data)
      setCoinsData(response.data.data); // Update the API data in the context
    } catch (error) {
      console.error(error);
    }
  };

  const Layout = () => {
    return (
      <div className='app'>
        <div className='navbar'>
          <Navbar />
        </div>

        <div className='main '>
          <div className='routes'>
          <Outlet />
          </div>
          

          <div className='footer'>
            <Footer />
          </div>

        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Homepage />
        },
        {
          path: 'cryptocurrencies',
          element: <Cryptocurrencies />
        },
        {
          path: '/crypto/:coinId',
          element: <CryptoDetails />
        },
        {
          path: '/news',
          element: <News />
        }
      ]
    }
  ])

  return (

    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
