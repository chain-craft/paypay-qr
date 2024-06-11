import React, { useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
} from '@chakra-ui/react'
import { QrReader } from 'react-qr-reader';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { db } from '../contexts/FirebaseConfig.js'; // Adjust the path as necessary
import { collection, addDoc, getDoc, setDoc, doc } from 'firebase/firestore';

const Merchant = () => {
  const [qrData, setQrData] = useState('');
  const [message, setMessage] = useState('');
  const { address } = useAccount();
  const [facingMode, setFacingMode] = useState('environment');

  async function sha256(text) {
    const uint8 = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('')
  }

  const addDatatoFirestore = async (qrData, address) => {
    try {
      const qrDataHash = await sha256(qrData);
      console.log(qrDataHash)
      const docRef = doc(db, 'paypay-qr', qrDataHash);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMessage('Document with the same QR data already exists.');
        return;
      }
      await setDoc(docRef, { address });
      setMessage('Document successfully written!');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    addDatatoFirestore(qrData, address)
  };

  const handleResult = (data) => {
    // console.log(data)
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (error) => {
    setMessage('QR Error');
    console.error('QR Error:', error);
  };

  return (
    <div>
      QRを読み込んでアドレスを登録します。
      <QrReader delay={300} constraints={{ facingMode: 'environment' }} onError={handleError} onResult={handleResult} style={{ width: '100%' }} />
      <p>登録アドレス: {address}</p>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>登録QRコード</FormLabel>
          <Input
            id="qrData"
            type="text"
            value={qrData} />
          <Button colorScheme="teal" type="submit">Register</Button>
          <FormHelperText>
            {message && (message)}
          </FormHelperText>
        </FormControl>
      </form>
    </div>
  );
};

export default Merchant;
