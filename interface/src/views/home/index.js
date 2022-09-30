import React, {useState} from "react";
import Card from "../../components/web3-js/Card";
import { Grid, GridItem, Center, Heading } from "@chakra-ui/react";
import Results from "../../components/web3-js/Results";
import LibrarySelection from "../../components/LibrarySelection";

const Home = () => {

  return (
    <>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={6} bg="papayawhip">
          <Center>
            <Heading as="h2" size="2xl">
              Initiative
            </Heading>
          </Center>
        </GridItem>
        <GridItem colSpan={3} bg="papayawhip">
          <GridItem>
            <LibrarySelection />
          </GridItem>
          <GridItem colSpan={6}>
            <Center>
              <Card />
            </Center>
            <Results/>
          </GridItem>
        </GridItem>
        <GridItem colSpan={3} bg="tomato">
          <img src="https://gateway.pinata.cloud/ipfs/QmcawmcRoQWwR1UameLr2VCXLeqzMqUx47DomN7aEFCdu3"></img>
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
