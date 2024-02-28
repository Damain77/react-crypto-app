import { CryptoContextProvider } from './context/crypto-context';
import AppLayout from './components/Layout/AppLayout';
// const { Header, Footer, Sider, Content } = Layout;

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}
