import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useApiData } from '../app/ApiDataContext';

const Cryptocurrencies = ({ simplified }) => {
  
  const { coinsData } = useApiData();
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptos, setCryptos] = useState();

  // useEffect(() => {
  //   if (coinsData && coinsData.coins) {
  //     // Create a subset of the cryptocurrencies based on the count value
  //     const limitedCryptos = simplified
  //       ? coinsData.coins.slice(0, 10) // Display the first 10 if simplified
  //       : coinsData.coins.slice(0, 20); // Display the first 20 otherwise

  //     setCryptos(limitedCryptos);

  //   }
  // }, [coinsData, simplified]);

  // useEffect(() => {
  //   setCryptos(coinsData?.coins);

  //   const filteredData = coinsData?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

  //   setCryptos(filteredData);
  // }, [coinsData, searchTerm]);

  useEffect(() => {
    if (coinsData && coinsData.coins) {
      let filteredData = coinsData.coins;

      // Apply simplified or search filtering based on the conditions
      if (simplified) {
        filteredData = filteredData.slice(0, 10);
      } else if (searchTerm) {
        filteredData = filteredData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setCryptos(filteredData);
    }
  }, [coinsData, simplified, searchTerm]);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}

      { coinsData && (
        <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt='' />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      )}
      
    </>
  );
};

export default Cryptocurrencies;