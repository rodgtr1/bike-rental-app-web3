import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BlockchainProvider } from './context/BlockchainContext'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlockchainProvider>
    <ChakraProvider>
        <App />
    </ChakraProvider>
  </BlockchainProvider>
)
