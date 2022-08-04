require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["0x0"]
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        "0x0"
      ]
    }
  },
  solidity: "0.8.9",
};
