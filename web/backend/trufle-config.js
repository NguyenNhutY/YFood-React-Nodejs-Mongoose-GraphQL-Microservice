const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = "YOUR_INFURA_PROJECT_ID";
const mnemonic = "YOUR_METAMASK_MNEMONIC"; // Or your wallet's mnemonic phrase

module.exports = {
  // Specify the Solidity compiler version
  compilers: {
    solc: {
      version: "0.8.0", // Match with the version specified in your Solidity contract
    },
  },

  // Configure networks
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },

    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraKey}`
        ),
      network_id: 4, // Rinkeby's network id
      gas: 5500000, // Rinkeby has a limit of 8 million gas
      gasPrice: 10000000000, // 10 gwei
    },

    mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://mainnet.infura.io/v3/${infuraKey}`
        ),
      network_id: 1, // Mainnet's network id
      gas: 5500000, // Mainnet has a limit of 8 million gas
      gasPrice: 10000000000, // 10 gwei
    },
  },

  // Configuration for Truffle test
  mocha: {
    // Use a different reporter
    reporter: "spec",
  },

  // Configuration for Truffle's automatic contract build and deployment
  migrations_directory: "./migrations",
};
