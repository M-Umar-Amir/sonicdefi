window.onload = async () => {
  if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
  }

  try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
      console.error("User denied account access", error);
      alert("MetaMask connection required!");
      return;
  }

  // Set up Ethers.js provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractAddress = "0xf2Bb73742657e30661c2cc74ADaA5E62790Fd107";  // Replace with your contract address  
  const abi = [
      "function addDoctor(address doctor) external",
      "function addPatient(address patientAddress, string memory name, uint256 age, string memory medicalHistory) external",
      "function getPatient(address patientAddress) external view returns (string memory, uint256, string memory)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, signer);

  document.getElementById("addPatientButton").addEventListener("click", async () => {
      try {
          const patientAddress = document.getElementById("patientAddress").value;
          const name = document.getElementById("name").value;
          const age = parseInt(document.getElementById("age").value);
          const medicalHistory = document.getElementById("medicalHistory").value;

          if (!ethers.utils.isAddress(patientAddress)) {
              alert("Invalid Ethereum address!");
              return;
          }

          const tx = await contract.addPatient(patientAddress, name, age, medicalHistory);
          console.log("Transaction sent:", tx.hash);
          await tx.wait();
          console.log("Transaction confirmed!");
          alert("Patient added successfully!");
      } catch (error) {
          console.error("Error adding patient:", error);
          alert(`Failed to add patient: ${error.message}`);
      }
  });
};
