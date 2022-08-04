const hre = require("hardhat");

const addr = "0xD0ecEa17e11A8549F904f200580C57339CD7A899";

async function main() {
  const Unin = await hre.ethers.getContractAt("Unin", addr);
  const unin = Unin.attach(addr);

  const res = await unin.getPrice();
  console.log(res);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
