import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig} from 'wagmi';
import { defineChain} from 'viem';
import { mainnet, sepolia, polygon, optimism, arbitrum, base, zora,} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const joc = defineChain({
  id: 10081, // Custom chain ID
  network: 'JOC',
  name: 'JapanOpenChain', // Name of your custom chain
  nativeCurrency: {
    name: 'Japan Open Chain Token', // Name of the native currency
    symbol: 'JOC', // Symbol of the native currency
    decimals: 18, // Number of decimals for the native currency
  },
  rpcUrls: {
    public: {
      http: ['https://rpc-1.testnet.japanopenchain.org:8545'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.testnet.japanopenchain.org/' },
  }
});

console.log(sepolia);
console.log(joc);

// Set up chains and providers
const { chains, publicClient } = configureChains(
    [sepolia, mainnet, polygon, joc],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );

const { connectors } = getDefaultWallets({
  appName: 'PayPay-QR',
  projectId: 'fa1cfa3026b91c118826b10f5974f6c1',
  chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

export const RainbowKitWrapper = ({ children }) => (
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);