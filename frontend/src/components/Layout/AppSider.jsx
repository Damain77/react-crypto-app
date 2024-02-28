
import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
import { useCrypto } from '../../context/crypto-context';

const siderStyle = {
    padding: '1rem',
    color: '#fff',
  };

export default function AppSider(){
  const {assets} = useCrypto()
  

  return(
      <Layout.Sider width="25%" style={siderStyle}>
        {assets.map(asset =>
          <Card key = {asset.id} style={{marginBottom:'1rem'}}>
            <Statistic 
              title={capitalize(asset.id)}
              value={new Intl.NumberFormat("en", {style: "currency", currency: "USD"}).format(asset.totalProfit)}
              precision={2}
              valueStyle={
                {color: asset.grow? '#3f8600' :'#cf1322'}
              }
              prefix={
                asset.grow
                ? <ArrowUpOutlined />
                : <ArrowDownOutlined />
              }
              suffix=""
            />
            <List
              size='small'
              dataSource={[
                {title: 'Total Amount', value: asset.totalAmount, isPlain: true, withTag: true},
                {title: 'Asset Amount', value: asset.amount,},
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent + " %"}</Tag>}
                    {item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2) + '$'}</Typography.Text>}
                    {!item.isPlain && item.value}
                  </span>

                </List.Item>
              )}
            />
          </Card>
        )}
    </Layout.Sider>
  )
}