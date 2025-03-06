//require("@nomicfoundation/hardhat-toolbox");

///** @type import('hardhat/config').HardhatUserConfig */
//module.exports = {
  //solidity: "0.8.28",
//};

require("@nomicfoundation/hardhat-toolbox");

// Replace this private key with your Sonic account private key
const SONIC_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

module.exports = {
  solidity: "0.8.28",
  networks: {
    sonic: {
      url: "https://rpc.blaze.soniclabs.com",
      accounts: [SONIC_PRIVATE_KEY]
    },
    hardhat: {
      // Hardhat Network settings
      chainId: 1337,
    },
  }
};