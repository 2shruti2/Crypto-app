import { Typography, Space } from "antd"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div >
            <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                <Link to="/">
                    Cryptoverse Inc.
                </Link> <br />
                All Rights Reserved.
            </Typography.Title>
            <Space>
                <Link to='/'>Home</Link>
                <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                <Link to='/news'>News</Link>
            </Space>
        </div>
    )
}

export default Footer