pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract MySystem is Ownable {
    struct User {
        string username;
        uint256 age;
    }
    mapping(address => bool) private invited;
    mapping(address => User) private users;

    constructor() public {
    }

    modifier onlyInvited() {
        require(invited[msg.sender] == true, "You are not invited");
        _;
    }

    function inviteUser(address _invite) public onlyOwner() {
        invited[_invite] = true;
    }

    function isInvited(address _user) public view returns(bool) {
        return invited[_user];
    }

    function join(string memory _username, uint256 _age) public onlyInvited() {
        invited[msg.sender] = false;
        User memory user;
        user.username = _username;
        user.age = _age;
        users[msg.sender] = user;
    }

    function getUserName(address _userAddress) public view returns(string memory) {
        User memory user = users[_userAddress];
        return user.username;
    }
}
