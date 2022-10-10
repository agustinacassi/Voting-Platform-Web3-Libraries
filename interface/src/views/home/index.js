import React, { useState } from "react";
import Card from "../../components/web3-js/Card";
import CardEthers from "../../components/ethers-js/Card";
import { Grid, GridItem, Center, Heading, Text } from "@chakra-ui/react";
import Results from "../../components/web3-js/Results";

const Home = () => {
  const [value, setValue] = useState("web3");

  return (
    <>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={6}>
          <Center>
            <Heading as="h2" size="2xl">
              Initiative
            </Heading>
          </Center>
        </GridItem>
        <GridItem colSpan={3}>
          {/* 
          THIS CODE WILL BE USED TO CHANGE BETWEEN ETHERS.JS AND WEB3.JS
          <GridItem>
            <Stack spacing={3}>
              <Select
                onChange={(e) => setValue(e.target.value)}
                size="md"
                placeholder="Select a library"
              >
                <option value={"web3"}>Web3.js</option>
                <option value={"ethers"}>Ethers.js</option>
              </Select>
            </Stack>
          </GridItem> */}
          <GridItem colSpan={6}>
            {value === "ethers" ? (
              <Center>
                <CardEthers />
              </Center>
            ) : (
              <div>
                <Center>
                  <Text margin={"30px"} as="samp">
                    Welcome to this voting DApp, a descentralized platform that
                    allows people to vote on a binary proposal. Each Ethereum
                    Address is allowed to vote only once and the vote costs 0.01
                    ETH.
                  </Text>
                </Center>
                <Center>
                  <Text margin={"30px"} as="samp">
                    Please <b>connect your wallet</b> and use{" "}
                    <b>Göerli Network</b> to interact.
                  </Text>
                </Center>
                <Card />
              </div>
            )}
          </GridItem>
        </GridItem>
        <GridItem colSpan={3}>
          <img src="https://gateway.pinata.cloud/ipfs/QmcawmcRoQWwR1UameLr2VCXLeqzMqUx47DomN7aEFCdu3"></img>
          {
            <div>
              <Center>
                <Results />
              </Center>
            </div>
          }
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
