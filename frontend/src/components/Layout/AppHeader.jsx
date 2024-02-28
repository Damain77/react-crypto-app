import { Layout, Select, Space, Button, Modal, Drawer } from "antd"
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useRef, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
    with: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};


export default function AppHeader(){
    const { crypto } = useCrypto() // наш пользовательский Хук
    const [select, setSelect] = useState(false)
    const [modal, setModal] =  useState(false)
    const [coin,setCoin] = useState(null)
    const [drawer,setDrawer] = useState(false)

    const handleSelect = (value) => {
        setCoin(crypto.find(coin=>coin.id==value))
        setModal(true)
    }
    
    useEffect(()=>{
        function keypress(e){
            if(e.key == '/') {
                setSelect(prev=>!prev)
            } 
        }
        document.addEventListener('keypress',keypress)

        return () => document.removeEventListener('keypress', keypress)
    },[])



    return(
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '250px',
                }}
                open={select}
                onSelect={handleSelect}
                onClick={()=>setSelect(prev=>!prev)}
                value={'Press / to open'}
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
            <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

            <Modal 
                open={modal}
                footer={null}
                onCancel={()=>setModal(false)}
            >
                <CoinInfoModal coin={coin}/>

            </Modal>

            <Drawer 
                width={600}
                title="Add Asset" 
                onClose={() => setDrawer(false)} 
                open={drawer}
                destroyOnClose                
            >
                <AddAssetForm onClose={()=>setDrawer(false)}/>
            </Drawer>

        </Layout.Header>
    )
}