// SPDX-License-Identifier: GPL-3.0

// IGNORE THIS ONE
pragma solidity >0.5.0 <=0.9.0;

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;

    mapping(address=>uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;

    }

    function transfer(address _to, uint _amount) public {
        require(balances[msg.sender] >= _amount, 'Not enough tokens');
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function balanceOf(address _name) public view returns(uint) {
        return balances[_name];
    }

}