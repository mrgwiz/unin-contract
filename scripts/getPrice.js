const hre = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

const addr = process.env.CONTRACT;

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
