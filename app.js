// Ensure the page has loaded before running the script
window.onload = async () => {
    // Set up Ethers.js provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    // Replace with your contract address
    const contractAddress = "0xYourContractAddress"; // Deployed contract address
    const abi = [
      // Contract ABI
      "function addDoctor(address doctor) external",
      "function addPatient(address patientAddress, string memory name, uint256 age, string memory medicalHistory) external",
      "function getPatient(address patientAddress) external view returns (string memory, uint256, string memory)"
    ];
  
    const contract = new ethers.Contract(contractAddress, abi, signer);
  
    // Add a patient
    document.getElementById("addPatientButton").addEventListener("click", async () => {
      const patientAddress = document.getElementById("patientAddress").value;
      const name = document.getElementById("name").value;
      const age = parseInt(document.getElementById("age").value);
      const medicalHistory = document.getElementById("medicalHistory").value;
  
      if (patientAddress && name && age && medicalHistory) {
        try {
          const tx = await contract.addPatient(patientAddress, name, age, medicalHistory);
          await tx.wait();
          alert("Patient added successfully!");
        } catch (error) {
          console.error("Error adding patient:", error);
          alert("Failed to add patient.");
        }
      } else {
        alert("Please fill in all fields.");
      }
    });
  
    // View a patient record
    document.getElementById("viewPatientButton").addEventListener("click", async () => {
      const patientAddress = document.getElementById("viewPatientAddress").value;
  
      if (patientAddress) {
        try {
          const [name, age, medicalHistory] = await contract.getPatient(patientAddress);
  
          document.getElementById("patientName").innerText = `Name: ${name}`;
          document.getElementById("patientAge").innerText = `Age: ${age}`;
          document.getElementById("patientHistory").innerText = `Medical History: ${medicalHistory}`;
          document.getElementById("patientInfo").style.display = "block";
        } catch (error) {
          console.error("Error fetching patient data:", error);
          alert("Failed to fetch patient data.");
        }
      } else {
        alert("Please enter a patient address.");
      }
    });
  };
  