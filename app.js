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

  const contractAddress = "0x9c0F3d80Fc94DC322cb107aCfee759228028389F";  // Replace with your contract address  
  const abi = [
      "function addDoctor(address doctor) external",
      "function addPatient(address patientAddress, string memory name, uint256 age, string memory medicalHistory) external",
      "function getPatient(address patientAddress) external view returns (string memory, uint256, string memory)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, signer);

  // Add Patient
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

  // View Patient
  document.getElementById("viewPatientButton").addEventListener("click", async () => {
      try {
          const patientAddress = document.getElementById("patientAddressView").value;

          if (!ethers.utils.isAddress(patientAddress)) {
              alert("Invalid Ethereum address!");
              return;
          }

          const patientData = await contract.getPatient(patientAddress);

          if (!patientData || !patientData[0]) {
              alert("Patient not found!");
              return;
          }

          const name = patientData[0];
          const age = patientData[1];
          const medicalHistory = patientData[2];

          document.getElementById("patientDetails").innerHTML = `
              <strong>Name:</strong> ${name} <br>
              <strong>Age:</strong> ${age} <br>
              <strong>Medical History:</strong> ${medicalHistory}
          `;

      } catch (error) {
          console.error("Error fetching patient:", error);
          alert(`Failed to retrieve patient: ${error.message}`);
      }
  });
};
