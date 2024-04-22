// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
// per 0x7DB8a20c5638EFc95Fb8b25d6FE437F518d20eEf
// live contract deploy
async function main() {
  // live
  // const wklay = "0x19aac5f612f524b754ca7e7c41cbfa2e981a4432";
  // test
  const wklay = "0x043c471bee060e00a56ccd02c0ca286808a5a436";

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

  //   const swapHelper = await hre.ethers.deployContract("P3SwapHelper", [
  //     "0x547fc897e53e241856ac696f38b6ba19ab181031",
  //     "0xB8E8024969562d19bA43B0B464A4a689dB894ed3",
  //   ]);
  //   await swapHelper.waitForDeployment();

  //   console.log(
  //     `swapHelper Contract : ${swapHelper.target} input : 0x547fc897e53e241856ac696f38b6ba19ab181031 0xB8E8024969562d19bA43B0B464A4a689dB894ed3 \n`
  //   );

  // const swapHelper = await hre.ethers.deployContract("P3Helper", [
  //   "0x547fc897e53e241856ac696f38b6ba19ab181031",
  // ]);
  // await swapHelper.waitForDeployment();
  //   const P3Helper = await hre.ethers.getContractFactory("P3Helper", [
  //     "0x547fc897e53e241856ac696f38b6ba19ab181031",
  //   ]);
  //   await P3Helper.waitForDeployment();

  // console.log(
  //   `P3Helper Contract : ${swapHelper.target} input : 0x547fc897e53e241856ac696f38b6ba19ab181031 \n`
  // );
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
// helper
// 0xF53B3Cf2C5A02CeFFe8b2011AF9F76b13EAce987
