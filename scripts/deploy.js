// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// live contract deploy
async function main() {
  // live
  const wklay = "0x19aac5f612f524b754ca7e7c41cbfa2e981a4432";
  // test
  // const wklay = "0x043c471bee060e00a56ccd02c0ca286808a5a436";

  const factory = await hre.ethers.deployContract("P3DexFactory", [
    "0xa5E5f12acC05B3D7E019747b511df4DaC8027Ce2",
  ]);
  await factory.waitForDeployment();

  console.log(
    `factory Contract : ${factory.target}  0xa5E5f12acC05B3D7E019747b511df4DaC8027Ce2\n`
  );
  const router = await hre.ethers.deployContract("P3DexRouter02", [
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

