import React, { useEffect, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Box,
  Input,
  Button,
  Text,
  Grid,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Center,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import "./DashBoard.css";
import Loading from "./Loading";
import useDebouncer from "../Hooks/useDebounce";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";

const DashBoard = () => {
  const [search, setSearch] = useState("");
  // console.log('input',search.length)
  const [data, setData] = useState([]);

  const debounceSearchValue = useDebouncer(search, 3000);
  const [loading, setLaoding] = useState(false);

  let url = process.env.REACT_APP_URL;
  if (search.length > 0) {
    url = process.env.REACT_APP_SEARCH;
  }

  const getTokenData = async (debounceSearchValue) => {
    try {
      setLaoding(true);
      const response = await axios.get(`${url}?q=${debounceSearchValue}`);
      console.log(`${url}?q=${debounceSearchValue}`);
      setData(response.data.pairs);
      setLaoding(false);
    } catch (err) {
      console.log(err);
      setLaoding(false);
    }
  };

  useEffect(() => {
    getTokenData(debounceSearchValue);
  }, [debounceSearchValue]);

  return (
    <Box
      className="main-container"
      width={["420px", "800px", "100%", "1231px"]}
      border={"0px solid blue"}
      height={"100vh"}
    >
      <Box
        p={4}
        display={{ base: "block", md: "flex" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-end", md: "center" }}
        flexDirection={{ base: "column-reverse", md: "row" }}
        gap={10}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          width={"100%"}
          justify={"space-between"}
          align="center"
        >
          <Box display={{ base: "block", md: "none" }}>
            <ConnectButton />
          </Box>

          <InputGroup left="0px" width="380px" bg="black" borderRadius="30px">
            <Input
              placeholder="Search"
              className="search-input"
              color="white"
              _placeholder={{ opacity: 1, color: "white" }}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius={"20px"}
              background="linear-gradient(132deg, rgba(124, 15, 53, 0.20) 0%, rgba(88, 18, 102, 0.20) 100%)"
              pl="1.5rem" // Add left padding to make space for the SearchIcon
            />
            <InputRightElement
              pointerEvents="none"
              children={
                <SearchIcon
                  color="white"
                  fontSize={"19px"}
                  marginRight={5}
                  marginTop={1}
                />
              }
            />
          </InputGroup>

          <ConnectButton />
        </Stack>
      </Box>
      <Text className="main-heading" fontSize="4xl">
        Token Search Results
      </Text>

      <Grid
        className="grid-container"
        m={"auto"}
        justifyContent={"center"}
        gap={"10px"}
      >
        {/* {console.log(data)} */}
        {!loading ? (
          data
            ?.sort((a, b) => b.priceUsd - a.priceUsd)
            .slice(0, 10)
            .map((el) => {
              return (
                <SimpleGrid
                  key={Date.now() + Math.random()}
                  columns={[1, 2, 2, 4]}
                  gap={{ base: "20px", md: "10px" }}
                  p={5}
                >
                  {/* Basic Info */}
                  <Box className="each-card">
                    <Text
                      ml={"32px"}
                      mb={"12px"}
                      mt={"23px"}
                      className="head-text"
                    >
                      Basic Info{" "}
                    </Text>
                    <Flex mb={"33px"}>
                      <Flex
                        ml={"32px"}
                        direction="column"
                        border={"0px solid green"}
                      >
                        <Text className="texts">Pair created at</Text>
                        <Text className="texts">Symbol</Text>
                        <Text className="texts">Dex ID</Text>
                        <Text className="texts">Pair Address</Text>
                      </Flex>
                      <Flex
                        ml={"32px"}
                        direction="column"
                        border={"0px solid red"}
                      >
                        <Text className="texts">
                          {el?.baseToken?.name.substring(0, 9)}
                        </Text>
                        <Text className="texts">{el?.baseToken?.symbol}</Text>
                        <Text className="texts">
                          #{el?.dexId.substring(0, 4)}
                        </Text>
                        <Text className="texts">
                          #{el?.pairAddress.substring(0, 4)}
                        </Text>
                      </Flex>

                      <Box className="card-logo">
                        <svg
                          className="inner"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                        >
                          <path
                            d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                            fill="white"
                          />
                        </svg>
                      </Box>
                    </Flex>
                  </Box>
                  {/* {Base Token} */}
                  <Box className="each-card">
                    <Text
                      ml={"32px"}
                      mb={"12px"}
                      mt={"23px"}
                      className="head-text"
                    >
                      Base Token{" "}
                    </Text>
                    <Flex mb={"33px"}>
                      <Flex
                        ml={"32px"}
                        direction="column"
                        border={"0px solid green"}
                      >
                        <Text className="texts">Name</Text>
                        <Text className="texts">Symbol</Text>
                        <Text className="texts">Address</Text>
                      </Flex>
                      <Flex
                        ml={"70px"}
                        direction="column"
                        border={"0px solid red"}
                      >
                        <Text className="texts">
                          {el?.baseToken?.name.substring(0, 9)}
                        </Text>
                        <Text className="texts">{el?.baseToken?.symbol}</Text>
                        <Text className="texts">
                          #{el?.baseToken["address"].substring(0, 4)}
                        </Text>
                      </Flex>
                      <Box className="card-logo">
                        {/* className="inner" */}
                        <svg
                          className="inner"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                        >
                          <path
                            d="M12 22L3 17V7L12 2L21 7V17L12 22ZM9.1 9.25C9.48333 8.85 9.925 8.54167 10.425 8.325C10.925 8.10833 11.45 8 12 8C12.55 8 13.075 8.10833 13.575 8.325C14.075 8.54167 14.5167 8.85 14.9 9.25L17.9 7.575L12 4.3L6.1 7.575L9.1 9.25ZM11 19.15V15.875C10.1 15.6417 9.375 15.1667 8.825 14.45C8.275 13.7333 8 12.9167 8 12C8 11.8167 8.00833 11.6457 8.025 11.487C8.04167 11.3283 8.075 11.166 8.125 11L5 9.25V15.825L11 19.15ZM12 14C12.55 14 13.021 13.804 13.413 13.412C13.805 13.02 14.0007 12.5493 14 12C14 11.45 13.804 10.979 13.412 10.587C13.02 10.195 12.5493 9.99933 12 10C11.45 10 10.979 10.196 10.587 10.588C10.195 10.98 9.99933 11.4507 10 12C10 12.55 10.196 13.021 10.588 13.413C10.98 13.805 11.4507 14.0007 12 14ZM13 19.15L19 15.825V9.25L15.875 11C15.925 11.1667 15.9583 11.3293 15.975 11.488C15.9917 11.6467 16 11.8173 16 12C16 12.9167 15.725 13.7333 15.175 14.45C14.625 15.1667 13.9 15.6417 13 15.875V19.15Z"
                            fill="white"
                          />
                        </svg>
                      </Box>
                    </Flex>
                  </Box>
                  {/* Quote Token */}
                  <Box className="each-card">
                    <Text
                      ml={"32px"}
                      mb={"12px"}
                      mt={"23px"}
                      className="head-text"
                    >
                      Basic Info{" "}
                    </Text>
                    <Flex mb={"33px"}>
                      <Flex
                        ml={"32px"}
                        direction="column"
                        border={"0px solid green"}
                      >
                        <Text className="texts">Name</Text>
                        <Text className="texts">Symbol</Text>
                        <Text className="texts">Address</Text>
                      </Flex>
                      <Flex
                        ml={"70px"}
                        direction="column"
                        border={"0px solid red"}
                      >
                        <Text className="texts">
                          {el?.quoteToken?.name.substring(0, 9)}
                        </Text>
                        <Text className="texts">{el?.quoteToken?.symbol}</Text>
                        <Text className="texts">
                          #{el?.quoteToken["address"].substring(0, 4)}
                        </Text>
                      </Flex>
                      <Box className="card-logo">
                        <svg
                          className="inner"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_32_238)">
                            <path
                              d="M12 22L3 17V7L12 2L21 7V17L12 22ZM9.1 9.25C9.48333 8.85 9.925 8.54167 10.425 8.325C10.925 8.10833 11.45 8 12 8C12.55 8 13.075 8.10833 13.575 8.325C14.075 8.54167 14.5167 8.85 14.9 9.25L17.9 7.575L12 4.3L6.1 7.575L9.1 9.25ZM11 19.15V15.875C10.1 15.6417 9.375 15.1667 8.825 14.45C8.275 13.7333 8 12.9167 8 12C8 11.8167 8.00833 11.6457 8.025 11.487C8.04167 11.3283 8.075 11.166 8.125 11L5 9.25V15.825L11 19.15ZM12 14C12.55 14 13.021 13.804 13.413 13.412C13.805 13.02 14.0007 12.5493 14 12C14 11.45 13.804 10.979 13.412 10.587C13.02 10.195 12.5493 9.99933 12 10C11.45 10 10.979 10.196 10.587 10.588C10.195 10.98 9.99933 11.4507 10 12C10 12.55 10.196 13.021 10.588 13.413C10.98 13.805 11.4507 14.0007 12 14ZM13 19.15L19 15.825V9.25L15.875 11C15.925 11.1667 15.9583 11.3293 15.975 11.488C15.9917 11.6467 16 11.8173 16 12C16 12.9167 15.725 13.7333 15.175 14.45C14.625 15.1667 13.9 15.6417 13 15.875V19.15Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_32_238">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Box>
                    </Flex>
                  </Box>

                  <Box className="each-card">
                    <Text
                      ml={"32px"}
                      mb={"12px"}
                      mt={"23px"}
                      className="head-text"
                    >
                      Price{" "}
                    </Text>
                    <Flex mb={"33px"}>
                      <Flex
                        ml={"32px"}
                        direction="column"
                        border={"0px solid green"}
                      >
                        <Text className="texts">Price Native</Text>
                        <Text className="texts">Price USD</Text>
                      </Flex>
                      <Flex
                        ml={"60px"}
                        direction="column"
                        border={"0px solid red"}
                      >
                        <Text className="texts">{el?.priceNative}</Text>
                        <Text className="texts">{el?.priceUsd}</Text>
                      </Flex>
                      <Box className="card-logo">
                        <svg
                          className="inner"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.47621 6.84C8.81501 7.3356 8.51621 7.9296 8.51621 8.484C8.51621 9.0396 8.81501 9.6336 9.47621 10.1304C10.1386 10.6272 11.1082 10.9704 12.2302 10.9704C12.5485 10.9704 12.8537 11.0968 13.0787 11.3219C13.3038 11.5469 13.4302 11.8521 13.4302 12.1704C13.4302 12.4887 13.3038 12.7939 13.0787 13.0189C12.8537 13.244 12.5485 13.3704 12.2302 13.3704C10.639 13.3704 9.15221 12.888 8.03621 12.0504C6.92021 11.2128 6.11621 9.9648 6.11621 8.4852C6.11621 7.0044 6.92021 5.7564 8.03621 4.9188C9.15221 4.0824 10.6402 3.6 12.2302 3.6C14.6938 3.6 17.023 4.7796 17.9494 6.744C18.0166 6.88661 18.0551 7.04107 18.0626 7.19855C18.0701 7.35603 18.0465 7.51345 17.9932 7.66182C17.9399 7.81019 17.8579 7.9466 17.7518 8.06327C17.6458 8.17995 17.5178 8.27459 17.3752 8.3418C17.2326 8.40901 17.0781 8.44747 16.9207 8.45499C16.7632 8.46251 16.6058 8.43893 16.4574 8.38561C16.309 8.33229 16.1726 8.25027 16.0559 8.14423C15.9393 8.0382 15.8446 7.91021 15.7774 7.7676C15.3574 6.8712 14.047 6 12.2314 6C11.1094 6 10.1386 6.3432 9.47621 6.84Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.5883 17.4996C15.2495 17.004 15.5471 16.41 15.5471 15.8556C15.5471 15.3 15.2495 14.7048 14.5871 14.2092C13.9259 13.7124 12.9551 13.3692 11.8343 13.3692C11.516 13.3692 11.2108 13.2428 10.9858 13.0177C10.7607 12.7927 10.6343 12.4875 10.6343 12.1692C10.6343 11.8509 10.7607 11.5457 10.9858 11.3207C11.2108 11.0956 11.516 10.9692 11.8343 10.9692C13.4255 10.9692 14.9123 11.4516 16.0283 12.2892C17.1443 13.1268 17.9471 14.3748 17.9471 15.8544C17.9471 17.334 17.1443 18.5832 16.0271 19.4196C14.9111 20.2572 13.4255 20.7396 11.8343 20.7396C9.3707 20.7396 7.0403 19.56 6.1151 17.5944C5.97936 17.3065 5.96354 16.9765 6.07111 16.677C6.17868 16.3775 6.40084 16.1329 6.6887 15.9972C6.97657 15.8615 7.30657 15.8456 7.6061 15.9532C7.90563 16.0608 8.15016 16.2829 8.2859 16.5708C8.7083 17.4684 10.0187 18.3396 11.8343 18.3396C12.9563 18.3396 13.9259 17.9964 14.5883 17.4996ZM11.9999 1.2C12.3182 1.2 12.6234 1.32643 12.8484 1.55147C13.0735 1.77651 13.1999 2.08174 13.1999 2.4V3.6C13.1999 3.91826 13.0735 4.22348 12.8484 4.44853C12.6234 4.67357 12.3182 4.8 11.9999 4.8C11.6816 4.8 11.3764 4.67357 11.1514 4.44853C10.9263 4.22348 10.7999 3.91826 10.7999 3.6V2.4C10.7999 2.08174 10.9263 1.77651 11.1514 1.55147C11.3764 1.32643 11.6816 1.2 11.9999 1.2Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9998 19.2C12.3181 19.2 12.6233 19.3264 12.8483 19.5515C13.0734 19.7765 13.1998 20.0817 13.1998 20.4V21.6C13.1998 21.9183 13.0734 22.2235 12.8483 22.4485C12.6233 22.6736 12.3181 22.8 11.9998 22.8C11.6815 22.8 11.3763 22.6736 11.1513 22.4485C10.9262 22.2235 10.7998 21.9183 10.7998 21.6V20.4C10.7998 20.0817 10.9262 19.7765 11.1513 19.5515C11.3763 19.3264 11.6815 19.2 11.9998 19.2Z"
                            fill="white"
                          />
                        </svg>
                      </Box>
                    </Flex>
                  </Box>
                </SimpleGrid>
              );
            })
        ) : (
          <Loading />
        )}
      </Grid>
      {!data.length > 0 && !loading ? (
        <Center mt={"-600px"}>
          <Heading color={"black"}>Data not found ......!</Heading>
        </Center>
      ) : (
        ""
      )}
    </Box>
  );
};

export default DashBoard;
