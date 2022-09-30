import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import contractArtifact from "../../config/web3/artifacts/contractArtifact";

const { address, abi } = contractArtifact;

const useContract = () => {
    const { active, library, chainId } = useWeb3React();
    
    const votingContract = useMemo(() => {
        if(active) return new library.eth.Contract(
        abi, address[chainId]
    )}, [active, chainId, library?.eth?.Contract]);

    return votingContract;

};

export default useContract;