// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const wklay = "0x19aac5f612f524b754ca7e7c41cbfa2e981a4432";
  const factory = "0xAEe29656Ed388ACa4cbb95317E4447024Da9831C";
  //   const factory = await hre.ethers.deployContract("P3Factory", [
  //     "0xe34f22cF55db5209bA6546701d408e5F58d8703f",
  //   ]);
  //   await factory.waitForDeployment();

  //   console.log(`factory Contract : ${factory.target}\n`);
  const router = await hre.ethers.deployContract("P3Router02", [
    // factory.target,
    factory,
    wklay,
  ]);
  await router.waitForDeployment();

  console.log(
    `factory Contract : ${factory}\nrouter Contract : ${router.target} input : ${factory} ${wklay} \n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// factory
// 0xAEe29656Ed388ACa4cbb95317E4447024Da9831C
// router
// 0x45dE690c9CA7BA7823A38F5fe3e03baA5C8D8833
// 0x29c12EdA8870690D91F9ECC9bbe6B9D5f82a44D1