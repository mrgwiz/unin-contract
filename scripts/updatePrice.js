const hre = require("hardhat");

const addr = "0xD0ecEa17e11A8549F904f200580C57339CD7A899";

async function main() {
  const [owner] = await ethers.getSigners();
  const Unin = await hre.ethers.getContractAt("Unin", addr);
  const unin = Unin.attach(addr);
  unin.connect(owner.address);

  const newPrice = ethers.utils.parseEther("0.05");
  const res = await unin.updatePrice(newPrice);

  const wait = await res.wait();
  
  console.log(wait.logs);
  
  console.log(`Updated price.`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
