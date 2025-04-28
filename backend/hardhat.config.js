require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    localhost:{
      url:"http://127.0.0.1:7545/",
      gas: 800000000000000,
      gasPrice: 20000000000
    }
  }
};
