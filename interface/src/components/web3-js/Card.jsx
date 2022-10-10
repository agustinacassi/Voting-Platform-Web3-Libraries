import React, { useCallback, useState } from "react";
import { Box, Heading, Text, Button, useToast, Center } from "@chakra-ui/react";
import useContract from "../../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const Card = () => {
  const voteContract = useContract();

  const { account } = useWeb3React();

  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  const toast = useToast();

  const positiveVoteRecord = useCallback(async () => {
    if (voteContract) {
      const feeAtContract = await voteContract.methods.VOTE_FEE().call();
      const fee = web3.utils.toWei(feeAtContract.toString(), "wei");
      voteContract.methods
        .vote(2)
        .send({
          from: account,
          value: fee,
        })
        .on("transactionHash", function (hash) {
          toast({
            title: "In progress",
            description: "Transaction in progress.",
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
        })
        .on("receipt", function (receipt) {
          toast({
            title: "Success",
            description: "Transaction approved.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
        })
        .on("error", function (error) {
          toast({
            title: "Error",
            description: "Transaction failed.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
        });
    }
  }, [voteContract]);

  const negativeVoteRecord = useCallback(async () => {
    if (voteContract) {
      const feeAtContract = await voteContract.methods.VOTE_FEE().call();
      const fee = web3.utils.toWei(feeAtContract.toString(), "wei");
      voteContract.methods
        .vote(1)
        .send({
          from: account,
          value: fee,
        })
        .on("transactionHash", function (hash) {
          toast({
            title: "In progress",
            description: "Transaction in progress.",
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
        })
        .on("receipt", function (receipt) {
          toast({
            title: "Success",
            description: "Transaction approved.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
        })
        .on("error", function (error) {
          toast({
            title: "Error",
            description: "Transaction failed.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
        });
    }
  }, [voteContract]);

  return (
    <div>
      <Box p={5} margin={"20px"} shadow="md" borderWidth="1px">
        <Center>
          <Heading  paddingBottom={"10px"} fontSize="xl">Vote for Yes</Heading>
        </Center>
        <Center>
          <Button
            onClick={positiveVoteRecord}
            colorScheme="teal"
            variant="outline"
          >
            Vote
          </Button>
        </Center>
      </Box>

      <Box p={5} margin={"20px"} shadow="md" borderWidth="1px">
        <Center>
          <Heading paddingBottom={"10px"} fontSize="xl">Vote for No</Heading>
        </Center>
        <Center>
          <Button
            onClick={negativeVoteRecord}
            colorScheme="teal"
            variant="outline"
          >
            Vote
          </Button>
        </Center>
      </Box>
    </div>
  );
};

export default Card;
