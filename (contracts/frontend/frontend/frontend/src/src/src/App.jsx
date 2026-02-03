import { showConnect } from '@stacks/connect'
import { userSession } from './wallet'
import { openContractCall, uintCV } from '@stacks/transactions'

function App() {
  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'Stacks Donation DApp',
        icon: window.location.origin + '/logo.png'
      },
      onFinish: () => {
        window.location.reload()
      },
      userSession
    })
  }

  const donate = async () => {
    const txOptions = {
      contractAddress: 'STGSD314CJWGNB8ENZRKQTNFYDRHKBRF3S80BP0Q.donation',
      contractName: 'donation',
      functionName: 'donate',
      functionArgs: [uintCV(1)],
      network: 'testnet',
      onFinish: (data) => {
        alert('Transaction sent: ' + data.txId)
      }
    }

    await openContractCall(txOptions)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Stacks Donation DApp</h1>

      {!userSession.isUserSignedIn() ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Wallet connected</p>
          <button onClick={donate}>Donate 1 STX</button>
        </>
      )}
    </div>
  )
}

export default App
                            
