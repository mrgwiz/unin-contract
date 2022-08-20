const hre = require("hardhat");
const dotenv = require("dotenv");
dotenv.config();

const contract = process.env.CONTRACT;
const addr = process.env.ADDR;

async function main() {
    const [owner] = await ethers.getSigners();
    const Unin = await hre.ethers.getContractAt("Unin", contract);
    const unin = Unin.attach(contract);
    unin.connect(addr);

    const res = await unin.mint(
        addr,
        [1, 15, 15, 15, 15, 15, 15, 10],
        { value: ethers.utils.parseEther("0.5") }
    );

    const result = await res.wait();

    console.log(result);

    console.log(`Minted`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
