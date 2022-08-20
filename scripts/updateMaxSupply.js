const hre = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

const addr = process.env.CONTRACT;
const supply = process.env.SUPPLY;

if (typeof parseInt(supply) !== "number") {
    console.log("Please provide a supply as a number");
    process.exit();
}

async function main() {
    const [owner] = await ethers.getSigners();
    const Unin = await hre.ethers.getContractAt("Unin", addr);
    const unin = Unin.attach(addr);
    unin.connect(owner.address);

    const res = await unin.updateMaxSupply(supply);

    const result = await res.wait();

    console.log(result);

    console.log(`Updated supply to ${supply}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
