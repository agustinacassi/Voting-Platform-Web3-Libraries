import { Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react";
import useContract from "../../hooks/useContract";
import React, { useState } from "react";

const Results = () => {
  const voteContract = useContract();

  const [resultsYes, setResultsYes] = useState();
  const [resultsNo, setResultsNo] = useState();
  const [showResults, setShowResults] = useState(false);

  const showAllResults = async () => {
    const positive = await voteContract.methods.votesForYes().call();
    setResultsYes(positive);
    const negative = await voteContract.methods.votesForNo().call();
    setResultsNo(negative);
    setShowResults(true);
  };

  return (
    <>
      {showResults === true ? (
        <StatGroup>
          <Stat padding={"5px"}>
            <StatLabel>Positive</StatLabel>
            <StatNumber>{resultsYes}</StatNumber>
          </Stat>
          <Stat padding={"5px"}>
            <StatLabel>Negative</StatLabel>
            <StatNumber>{resultsNo}</StatNumber>
          </Stat>
        </StatGroup>
      ) : (
        <button onClick={showAllResults}>Show Results</button>
      )}
    </>
  );
};

export default Results;
