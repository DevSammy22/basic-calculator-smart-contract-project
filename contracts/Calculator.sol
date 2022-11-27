// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error Calculator__NotDivisibleByZero();

/**
 * @title A Basic Calculator Contract
 * @notice This contract is for creating a basic calculator contract
 * @dev This implements basic operations
 */
contract Calculator {
    uint256 public s_result;

    function addNumber(uint256 a, uint256 b) external returns (uint256) {
        s_result = a + b;
        return s_result;
    }

    function subtractTwoNumber(uint256 a, uint256 b) external returns (uint256) {
        s_result = a - b;
        return s_result;
    }

    function multiplyTwoNumber(uint256 a, uint256 b) external returns (uint256) {
        s_result = a * b;
        return s_result;
    }

    function divideTwoNumber(uint256 a, uint256 b) external returns (uint256) {
        if (b == 0) {
            revert Calculator__NotDivisibleByZero();
        }
        s_result = a / b;
        return s_result;
    }

    function getResult() public view returns (uint256) {
        return s_result;
    }
}
