import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useApiData } from '../app/ApiDataContext';
const { Title } = Typography;

function CoinStats() {
    
    const { apiData } = useApiData();

    return (
        <div >
            {apiData && (
                <div>
                    <Title level={2} className="heading">Global Crypto Stats</Title>
                    <Row gutter={[32, 32]}>
                        <Col span={12}><Statistic title="Total Cryptocurrencies" value={apiData.totalCoins} /></Col>
                        <Col span={12}><Statistic title="Total Exchanges" value={millify(apiData.totalExchanges)} /></Col>
                        <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(apiData.totalMarketCap)}`} /></Col>
                        <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(apiData.total24hVolume)}`} /></Col>
                        <Col span={12}><Statistic title="Total Markets" value={millify(apiData.totalMarkets)} /></Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default CoinStats;
