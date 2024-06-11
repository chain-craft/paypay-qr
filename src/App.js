import React, { useEffect, useState } from 'react';
import { Image, ChakraProvider, Container, Tabs, TabList, TabPanels, Tab, TabPanel, Link as ChakraLink, LinkProps, Stack, HStack, VStack, Box, Center } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes, Link as ReactRouterLink } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { RainbowKitWrapper } from './components/SetupRainbowKit.js';

import Merchant from './components/Merchant';
import Customer from './components/Customer';

import logo from "./images/logo.webp";
import logo2 from "./images/logo2.png";

const App = () => {

  return (
    <ChakraProvider>
      <RainbowKitWrapper>
        <WalletProvider>
          <AppContent />
        </WalletProvider>
      </RainbowKitWrapper >
    </ChakraProvider>
  );
}

const AppContent = () => {
  const [walletAddress, setWalletAddress] = useState('');
  return (
    
    <WalletProvider value={{ walletAddress, setWalletAddress }}>
      {/* <Image src={logo2} /> */}
      <Center padding={4}>
      <ConnectButton />
      </Center>
      <Router>
        <Tabs>
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}><ChakraLink as={ReactRouterLink} to="/merchant">店舗側ページ</ChakraLink></Tab>
            <Tab _selected={{ color: 'white', bg: 'green.400' }}><ChakraLink as={ReactRouterLink} to="/customer">顧客側ページ</ChakraLink></Tab>
          </TabList>
        </Tabs>
        <Routes>
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
};

export default App;
