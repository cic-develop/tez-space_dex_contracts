import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },

  networks: {
    live: {
      chainId: 8217,
      url: process.env.KLAYTN_NODE_MAIN_ENDPOINT,
      accounts: [process.env.LIVE_PRIV_KEY || ""],
    },
    test: {
      chainId: 8217,
      url: process.env.KLAYTN_NODE_TEST_ENDPOINT,
      accounts: [process.env.TEST_PRIV_KEY || ""],
    },
  },
  etherscan: {
    apiKey: {
      live: process.env.ETHERSCAN_API_KEY || "",
      test: process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "live",
        chainId: 8217,
        urls: {
          apiURL: process.env.ETHERSCAN_API_URL || "",
          browserURL: "https://klaytnscope.com",
        },
      },
      {
        network: "test",
        chainId: 8217,
        urls: {
          apiURL: process.env.ETHERSCAN_API_URL || "",
          browserURL: "https://klaytnscope.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
