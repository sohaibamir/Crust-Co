// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    address private owner;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    event TokensRewarded(address indexed recipient, uint256 amount);

    constructor() ERC20("TasteCoin", "TC") {
        owner = msg.sender;
    }

    function rewardTokens(
        address recipient,
        uint256 amount
    ) external onlyOwner {
        _mint(recipient, amount);
        emit TokensRewarded(recipient, amount);
    }
}
