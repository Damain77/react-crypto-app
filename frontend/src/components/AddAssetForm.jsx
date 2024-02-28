import { useRef, useState } from "react"
import { Select, Space, Divider, Form, InputNumber, Button, DatePicker, Result } from "antd"
import { useCrypto } from "../context/crypto-context"
import CoinInfo from "./CoinInfo"


export default function AddAssetForm({ onClose }){
    const [coin,setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const { crypto, addAsset } = useCrypto()
    const [form] = Form.useForm()
    const assetRef = useRef()


    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added!"
                subTitle={`Added ${form.getFieldValue('amount')} of ${coin.name} by price ${form.getFieldValue('price').toLocaleString() + '$'}`}
                extra={[
                    <Button type="primary" key="console" onClick={()=>onClose()}>
                        Close
                    </Button>,
                ]}
            />
        )
    }


    const validateMessages = {
        recuired: '${label} is required',
        types: {
            number: '${label} is not valid number'
        },
        number: {
            range: '${label} must be between ${min} and {max}'
        }
    }

    ////

    const handleSelect = (value) => {
        setCoin(crypto.find(coin => coin.id == value))
    }



    if (!coin){
        return(
            <Select
                style={{
                    width: '100%',
                }}
                onSelect={handleSelect}
                placeholder ='Select Coin'
                optionLabelProp="label"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
                    </Space>
                )}
            />            
        )
    }

    const onFinish = (values) =>{
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        console.log(newAsset)
        assetRef.current = newAsset
        setSubmitted(true)
        addAsset(newAsset)
    }

    const handleAmountChange = (value) => {
        const price = form.getFieldValue('price')
        form.setFieldsValue({            
            total: (value * price).toLocaleString() + '$'
        })
    }
    const handlePriceChange = (value) => {
        let amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: amount && (value * amount).toLocaleString() + '$'
        })
    }
    return (
        <Form
            ref={assetRef}
            name="basic"
            form = {form}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinInfo coin = {coin} />
            <Divider  />            
            <Form.Item
                label="Amount"
                name="amount"                
                rules={[
                    {
                        required: true,
                        type: 'number',
                        min: 0,
                    },
                ]}
                >
                <InputNumber 
                    placeholder='Enter coin amount' 
                    style={{width: '100%'}} 
                    onChange={handleAmountChange}
                />
            </Form.Item>

            <Form.Item label="Price" name="price" >
                <InputNumber 
                    style={{width: '100%'}}
                    onChange={handlePriceChange}
                />
            </Form.Item>
            <Form.Item label="Date & Time" name="date" >
                <DatePicker showTime/>
            </Form.Item>
            <Form.Item label="Total" name="total" >
                <InputNumber disabled style={{width: '100%'}} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>

    )
}