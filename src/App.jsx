import React, { useState } from "react";
import {
  VStack,
  IconButton,
  useMediaQuery,
  Flex,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SideBar, { MobileSidebar } from "./Components/SideBar";
import DashBoard from "./Components/DashBoard";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})



const App = () => {
  const [isMobile] = useMediaQuery("(max-width: 700px)");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
    <Box>
      <Flex width={"fit-content"} className="container">
        {isMobile && (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={toggleMobileSidebar}
            variant="white"
            ml={7}
            mt={9}
            fontSize={30}
            zIndex={99}
            width={"16.714px"}
            h={"12.857px"}
            stroke={"1.714px"}
            position="fixed"
            bg="transparent"
            color="white"
            _hover={{ bg: "transparent" }}
          />
        )}

        {!isMobile && (
          <VStack>
            <SideBar />
          </VStack>
        )}

        {isMobile && (
          <MobileSidebar
            isOpen={isMobileSidebarOpen}
            onClose={toggleMobileSidebar}
          />
        )}

        <DashBoard isMobile={isMobile} />
      </Flex>
      <Box
        zIndex={100}
        position={"sticky"}
        width={["100%", "100%", "950px", "1519px"]}
        bg={"#F30050"}
        mt={"-50px"}
        height={"68px"}
        flexShrink={0}
      >
        r
      </Box>
    </Box>
    </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
