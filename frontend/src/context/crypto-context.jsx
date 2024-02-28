import { createContext, useState, useEffect, useContext } from 'react'
import { fetchAssets, fakeFetchCrypto } from '../components/Layout/Api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({children}){
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])
    const [loading, setLoading] = useState(false)

    function mapAssets(assets,result){
      return assets.map(asset =>{
        const coin = result.find((c)=> c.id == asset.id)
        return {
          grow: asset.price < coin.price, //true or false
          growPercent: percentDifference(asset.price,coin.price),
          totalAmount: (asset.amount * coin.price),
          totalProfit: (asset.amount * (coin.price - asset.price)).toFixed(2),
          name: coin.name,
          ...asset
        }
      })
    }

    useEffect(()=>{
      async function preload(){
        setLoading(true)
        const { result } = await fakeFetchCrypto()
        const assets = await fetchAssets()
        
        setAssets(mapAssets(assets,result))
        setCrypto(result)
        setLoading(false)
      }
      preload()
    },[])

    function addAsset (newAsset) {
      setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }


    return <CryptoContext.Provider value={{assets, crypto, loading, addAsset}}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto(){
  return useContext(CryptoContext)
}