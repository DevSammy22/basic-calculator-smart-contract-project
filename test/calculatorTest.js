const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("Calculator", function () {
    let calculatorFactory, calculator;
    beforeEach(async function () {
        calculatorFactory = await ethers.getContractFactory("Calculator");
        calculator = await calculatorFactory.deploy();
    });

    it("Should add two numbers", async function () {
        const a = 5;
        const b = 7;
        const expectedValue = "12";
        const result = await calculator.addNumber(a, b);
        await result.wait(1);

        const exactValue = await calculator.getResult();
        assert.equal(exactValue.toString(), expectedValue);
    });

    it("Should subtract two numbers", async function () {
        const a = 7;
        const b = 5;
        const expectedValue = "2";
        const result = await calculator.subtractTwoNumber(a, b);
        await result.wait(1);

        const exactValue = await calculator.getResult();
        assert.equal(exactValue.toString(), expectedValue);
    });

    it("Should multiply two numbers", async function () {
        const a = 5;
        const b = 5;
        const expectedValue = "25";
        const result = await calculator.multiplyTwoNumber(a, b);
        await result.wait(1);

        const exactValue = await calculator.getResult();
        assert.equal(exactValue.toString(), expectedValue);
    });

    it("Should divide two numbers", async function () {
        const a = 20;
        const b = 5;
        const expectedValue = "4";
        const result = await calculator.divideTwoNumber(a, b);
        await result.wait(1);

        const exactValue = await calculator.getResult();
        assert.equal(exactValue.toString(), expectedValue);
    });
});
