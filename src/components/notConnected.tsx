import '@/styles/notconnected.modules.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
const  NotConnected = ()=>{
 
  return (
    <div id='notConnectedContainer'>
      <h1>View , manage your solana super team Activites and so much more ...</h1>
      <p>connect your wallet to get started</p>
      <WalletMultiButton />
    </div>
  )
}

export default NotConnected