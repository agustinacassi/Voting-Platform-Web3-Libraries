import React, { useCallback } from "react";
import { Stack, Box, Heading, Text, Button, useToast } from "@chakra-ui/react";
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
              position: "bottom"
            });
          })
          .on("receipt", function (receipt) {
            toast({
              title: "Success",
              description: "Transaction approved.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "bottom"
            });
          })
          .on("error", function (error) {
            toast({
              title: "Error",
              description: "Transaction failed.",
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "bottom"
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
              position: "bottom"
            });
          })
          .on("receipt", function (receipt) {
            toast({
              title: "Success",
              description: "Transaction approved.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "bottom"
            });
          })
          .on("error", function (error) {
            toast({
              title: "Error",
              description: "Transaction failed.",
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "bottom"
            });
          });
      }
    }, [voteContract]);



  const results = async () => {
    const voto = await voteContract.methods.getVote(account).call();
    console.log("esto es voto ", voto);
  };

  const clean = async () => {
    const reset = await voteContract.methods
      .clean()
      .send({ from: account })
      .on("transactionHash", function (hash) {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        console.log(confirmationNumber);
      })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error) {
        console.log(error);
      });
  };


  return (
    <div>
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Vote for Yes</Heading>
        <Text mt={4}>Click here to support the initiative.</Text>
        <Button onClick={positiveVoteRecord} colorScheme="teal" variant="outline">
          Vote
        </Button>
      </Box>

      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Vote for No</Heading>
        <Text mt={4}>Click here to decline the initiative.</Text>
        <Button onClick={negativeVoteRecord} colorScheme="teal" variant="outline">
          Vote
        </Button>
      </Box>

      <Button onClick={results}>Get vote</Button>
      <Button onClick={clean}>Reset</Button>
    </div>
  );
};

export default Card;
