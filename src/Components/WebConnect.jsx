// import { Button } from '@chakra-ui/react';
// import React, { useEffect, useState } from 'react';
// import Web3Modal from 'web3modal';

// const MyComponent = () => {
//   const [provider, setProvider] = useState();

//   const connectToWallet = async () => {
//     try {
//       const web3Modal = new Web3Modal({
//         network: 'mainnet', // Replace with your desired Ethereum network
//         cacheProvider: true, // Enable caching for the wallet provider
//       });

//       const provider = await web3Modal.connect();

//       if (provider) {
//         setProvider(provider);
//       }
//     } catch (error) {
//       console.error('Failed to connect:', error);
//     }
//   };

//   // ... Rest of your component code ...

//   return (
//     <Button onClick={connectToWallet}
//     background={'linear-gradient(131deg, #7C0F35 0%, #581266 100%)'} 
//         display={{ base: "none", md: "block" }}
//         width={'156px'}
//         height={'56px'}
//         borderRadius={'20px'}
//         _hover={{
//           background:'linear-gradient(131deg, #a61f4a 0%, #581266 100%)'
//         }}
//         mr={'44px'}
//     >Connect to Wallet</Button>
//     // ... Render other parts of your component ...
//   );
// };

// export default MyComponent;
