async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MedicalSystem = await ethers.getContractFactory("MedicalSystem");
  const medicalSystem = await MedicalSystem.deploy();

  console.log("Successfully deployed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });