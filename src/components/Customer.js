import React, { useState } from 'react';
import {
  Input,
  ChakraProvider,
  Button,NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi';
import { QrReader } from 'react-qr-reader';
import { db } from '../contexts/FirebaseConfig.js'; // Adjust the path as necessary
import { collection, addDoc, getDoc, setDoc, doc } from 'firebase/firestore';
import { useSendTransaction } from 'wagmi';
const ethers = require("ethers");


const Customer = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0.01);
  const [facingMode, setFacingMode] = useState('environment');

  async function sha256(text) {
    const uint8 = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('')
  }

  const { sendTransaction, data, isLoading, error } = useSendTransaction();

  const handleResult = async (data) => {
    if (data) {
      // console.log('data is here!', data)
      const qrDataHash = await sha256(data);
      console.log(qrDataHash)
      const docRef = doc(db, 'paypay-qr', qrDataHash);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data());
        setAddress(docSnap.data().address);
      } else {
        console.log('No matching document found.');
        setAddress(''); // or some other default/fallback action
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleSend = async (recipientAddress, amount) => {
    console.log(recipientAddress, amount)
    sendTransaction({
      to: recipientAddress,
      value: ethers.parseEther(amount.toString()),
    });
  };

  return (
    <div>
      QRを読み込んで暗号資産を送信します。
      <QrReader delay={300} constraints={{ facingMode: 'environment' }} onError={handleError} onResult={handleResult} style={{ width: '100%' }} />
      <p>送金先: {address}</p>
      <NumberInput defaultValue={0.01} precision={2} step={0.01} onChange={(value) => setAmount((value))}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>

      <Button colorScheme='teal' onClick={() => handleSend(address, amount)}>Send</Button>
    </div>
  );
};

export default Customer;
