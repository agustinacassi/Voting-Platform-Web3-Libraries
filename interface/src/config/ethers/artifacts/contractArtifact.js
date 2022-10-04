const contractArtifact = {
  address: "0xAcFC7725527bA2Ee4311574F65e5d76F9F9585E9",
  abi: [
   //Read-Only Methods
   "function proposalId() view returns (uint256)",
   "function votesForNo() view returns (uint256)",
   "function votesForYes() view returns (uint256)",
   "function VOTE_FEE() view returns (uint256)",
   "function getVote(address _user) external view returns (uint256)",

   //State-changing Methods
   "function vote(uint256 _vote) external payable",

   //Event
   "event VoteCasted(uint256 indexed proposalId, address indexed from, uint256 vote)",

   //Development
   "function clean() external"
  ],
};

export default contractArtifact;
