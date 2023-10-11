// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract Peculium {
    string public name = "Peculium";
    string public symbol = "PEC";
    uint8 public decimals = 18;
    uint256 public _totalSupply = 1000000e18; // 1 million

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    using SafeMath for uint256;

    constructor() {
        balances[msg.sender] = _totalSupply;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return balances[owner];
    }

    // return the current approved number of value by an owner to a specific delegate
    function allowance(
        address owner,
        address delegate
    ) public view returns (uint256) {
        return allowances[owner][delegate];
    }

    function transfer(address delegate, uint256 value) public returns (bool) {
        require(balances[msg.sender] >= value);
        balances[msg.sender] = balances[msg.sender].sub(value);
        balances[delegate] = balances[delegate].add(value);
        emit Transfer(msg.sender, delegate, value);
        return true;
    }

    // check total supply has the amount of token which needs to be allocated to a delegate account
    function approve(address delegate, uint256 value) public returns (bool) {
        allowances[msg.sender][delegate] = value;
        emit Approval(msg.sender, delegate, value);
        return true;
    }

    // facilitate the transfer of token between users.
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        require(value <= balances[from]);
        require(value <= allowances[from][msg.sender]);
        balances[from] = balances[from].sub(value);
        balances[to] = balances[to].add(value);
        allowances[from][msg.sender] = allowances[from][msg.sender].sub(value);
        emit Transfer(from, to, value);
        return true;
    }
}

// Safe Math Interface
library SafeMath {
    // Prevents an overflow attack
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}
