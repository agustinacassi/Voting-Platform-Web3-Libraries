import React, { useCallback } from "react";
import { Box, Heading, Text, Button, useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import contractArtifact from "../../config/ethers/artifacts/contractArtifact";

const Card = () => {
  const { account } = useWeb3React();

  const { abi, address } = contractArtifact;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const metamask = provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner(account);

  const voteContractSigner = new ethers.Contract(address, abi, signer);

  const voteContractReader = new ethers.Contract(address, abi, provider);

  const toast = useToast();

  const positiveVoteRecord = useCallback(async () => {
    if (voteContractSigner) {
      const fee = await voteContractReader.VOTE_FEE();
      const feeParsed = await fee.toString();
      console.log(feeParsed);
      voteContractSigner.vote(2, { value: feeParsed });
    }
  }, [voteContractSigner]);

  const negativeVoteRecord = useCallback(async () => {
    if (voteContractSigner) {
      const fee = await voteContractReader.VOTE_FEE();
      const feeParsed = await fee.toString();
      console.log(feeParsed);
      voteContractSigner.vote(1, { value: feeParsed });
    }
  }, [voteContractSigner]);

  const results = async () => {
    const result = await voteContractReader.getVote(account);
    console.log(result.toNumber());
  };

  const clean = async () => {
    const reset = voteContractSigner.clean();
  };

  return (
    <div>
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Vote for Yes</Heading>
        <Text mt={4}>Click here to support the initiative.</Text>
        <Button
          onClick={positiveVoteRecord}
          colorScheme="teal"
          variant="outline"
        >
          Vote
        </Button>
      </Box>

      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Vote for No</Heading>
        <Text mt={4}>Click here to decline the initiative.</Text>
        <Button
          onClick={negativeVoteRecord}
          colorScheme="teal"
          variant="outline"
        >
          Vote
        </Button>
      </Box>

      <Button onClick={results}>Get vote</Button>
      <Button onClick={clean}>Reset</Button>
    </div>
  );
};

export default Card;
