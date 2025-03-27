async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer)
  console.log(process.env.PRIVATE_KEY); // This should print your private key (without the '0x')
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