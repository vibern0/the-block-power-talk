pragma solidity ^0.5.0;


contract Registry {
    address private owner;
    string[] private users;

    constructor() public {
        owner = msg.sender;
    }

    function addUser(string memory _username) public {
        users.push(_username);
    }

    function totalUsers() public view returns(uint256) {
        return users.length;
    }

    function getLastUser() public view returns(string memory) {
        uint256 _totalUsers = totalUsers();
        require(_totalUsers > 0, "There's no users");
        return users[_totalUsers - 1];
    }
}