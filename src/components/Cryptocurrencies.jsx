import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useApiData } from '../app/ApiDataContext';

const Cryptocurrencies = ({ simplified }) => {
  // const count = simplified ? 10 : 100;
  
  const { coinsData } = useApiData();
  // const { apiData: cryptosList} = useApiData();
  const [cryptos, setCryptos] = useState();

  useEffect(() => {
    // console.log("coinsData " , coinsData)
    setCryptos(coinsData?.coins);
    
  }, [coinsData]);

  return (
    <>
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