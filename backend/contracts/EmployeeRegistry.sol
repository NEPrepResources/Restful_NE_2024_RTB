// SPDX-License-Identifier : UNLICENSED

pragma solidity ^0.8.18;

contract EmployeeRegistry{
    struct EmployeeAction{
        string action;
        uint256 timestamp;
    }
    mapping(uint256=>EmployeeAction) public employeeActions;

    function recordAction(uint256 employeeId, string memory action) public {
        employeeActions[employeeId]=EmployeeAction(action, block.timestamp);
    }

    function getEmployeeAction(uint256 employeeId) public view returns(string memory action, uint256 timestamp){
        EmployeeAction memory empAction= employeeActions[employeeId];
        return(empAction.action, empAction.timestamp);
    }
}