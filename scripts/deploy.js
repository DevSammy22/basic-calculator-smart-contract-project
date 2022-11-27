const { verifyMessage } = require("ethers/lib/utils");
const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
    /*Deploying the contract*/
    const CalculatorFactory = await ethers.getContractFactory("Calculator");
    console.log("Deploying contract, please wait...");
    const calculator = await CalculatorFactory.deploy();
    await calculator.deployed();
    console.log(`Deployed contract to: ${calculator.address}`);

    /*Verifying the contract*/
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...");
        await calculator.deployTransaction.wait(6); //Wait six blocks
        await verify(calculator.address, []);
    }

    /*Perform Calculations*/
    const calculationResponse = await calculator.addNumber(7, 8);
    // const calculationResponse = await calculator.subtractTwoNumber(9, 8);
    // const calculationResponse = await calculator.multiplyTwoNumber(2, 8);
    //const calculationResponse = await calculator.divideTwoNumber(16, 8);
    await calculationResponse.wait(1);
    const result = await calculator.getResult();
    console.log(`Result of the operation is: ${result}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
