import React, {useState} from "react";
import { Select, Stack } from "@chakra-ui/react";

const LibrarySelection = () => {

  const [value, setValue] = useState();

  return (
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
  );

};

export default LibrarySelection;