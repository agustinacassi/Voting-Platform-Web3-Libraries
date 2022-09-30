import { Progress, Text } from "@chakra-ui/react";
import useContract from "../../hooks/useContract";
import React, { useState } from "react";

const Results = () => {

  const voteContract = useContract();

  const [resultsYes, setResultsYes] = useState();
  const [resultsNo, setResultsNo] = useState();
  const [showResults, setShowResults] = useState(0);


  const showAllResults = async () => {
    const yes = await voteContract.methods.votesForYes().call();
    setResultsYes(yes);
    const no = await voteContract.methods.votesForNo().call();
    setResultsNo(no);
    setShowResults(1);
  };
 
  return (
    <>
      {showResults == 0 ? (
        <>
          <button onClick={showAllResults}>Show Results</button>
        </>
      ) : (
        <>
          <Text fontSize='lg'>Votes for yes: {resultsYes}</Text>
          <Progress key={1} value={resultsYes} />
          <Text fontSize='lg'>Votes for no: {resultsNo}</Text>
          <Progress key={2} value={resultsNo} />
        </>
      )}
    </>
  ); 
};

export default Results;
