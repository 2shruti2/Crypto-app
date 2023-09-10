import { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useApiData } from '../app/ApiDataContext';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState();
  const { coinsData } = useApiData();

  const { newsData } = useApiData();
  const [newss, setNewss] = useState();

  useEffect(() => {
    if (newsData && newsData.value) {
      // Create a subset of the cryptocurrencies based on the count value
      const limitedNews = simplified
        ? newsData.value.slice(0, 6) // Display the first 10 if simplified
        : newsData.value.slice(0, 12); // Display the first 20 otherwise

      setNewss(limitedNews);
      // console.log("news ", newsData)

    }
  }, [newsData, simplified]);


  if (!newss) return 'loading...';

  return (
    <>
      {newsData && (
        <Row gutter={[24, 24]}>

          {!simplified && (
            <Col span={24}>
              <Select
                showSearch
                className="select-news"
                placeholder="Select a Crypto"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="Cryptocurency">Cryptocurrency</Option>
                {coinsData?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
              </Select>
            </Col>
          )}

          {newss?.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card" style={{ borderRadius: "8px" }}>
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={5}>{news.name}</Title>
                    <img style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '3px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="newsimage" />
                  </div>

                  <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>

                  <div className="provider-container">
                    <div>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="image" />
                      <Text className="provider-name">{news.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default News;