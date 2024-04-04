// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const wklay = "0x19aac5f612f524b754ca7e7c41cbfa2e981a4432";

  const factory = await hre.ethers.deployContract("P3Factory", [
    "0xe34f22cF55db5209bA6546701d408e5F58d8703f",
  ]);
  await factory.waitForDeployment();

  console.log(`factory Contract : ${factory.target}\n`);
  const router = await hre.ethers.deployContract("P3Router02", [
    factory.target,
    wklay,
  ]);
  await router.waitForDeployment();

  console.log(
    `router Contract : ${router.target} input : ${factory.target} ${wklay} \n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// TEST Deploy
// factory
// 0x547fc897e53e241856ac696f38b6ba19ab181031
// router
// 0xB8E8024969562d19bA43B0B464A4a689dB894ed3
