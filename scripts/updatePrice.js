const hre = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

const addr = process.env.CONTRACT;
const price = process.env.PRICE;

if (typeof parseFloat(price) !== "number") {
    console.log("Please provide a price as a number");
    process.exit();
}

async function main() {
    const [owner] = await ethers.getSigners();
    const Unin = await hre.ethers.getContractAt("Unin", addr);
    const unin = Unin.attach(addr);
    unin.connect(owner.address);

    const parsedPrice = ethers.utils.parseEther(price);
    const res = await unin.updatePrice(parsedPrice);

    const result = await res.wait();

    console.log(result);

    console.log(`Updated price to ${price}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
